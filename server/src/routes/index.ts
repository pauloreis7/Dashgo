import { Router } from 'express'

import { checkAuthMiddleware } from './middlewares/checkAuthMiddleware'
import { addUserInformationToRequest } from './middlewares/addUserInformationToRequest'
import { generateJwtAndRefreshToken } from '../auth';

import { checkRefreshTokenIsValid, users, invalidateRefreshToken } from '../database';
import { CreateSessionDTO } from '../types';

const app = Router()

app.post('/sessions', (request, response) => {
  const { email, password } = request.body as CreateSessionDTO;

  const user = users.get(email);

  if (!user || password !== user.password) {
    return response
      .status(401)
      .json({ 
        error: true, 
        message: 'E-mail or password incorrect.'
      });
  }

  const { token, refreshToken } = generateJwtAndRefreshToken(email, {
    permissions: user.permissions,
    roles: user.roles,
  })

  return response.json({
    token,
    refreshToken,
    permissions: user.permissions,
    roles: user.roles,
  });
});

app.post('/refresh', addUserInformationToRequest, (request, response) => {
  const email = request.user;
  const { refreshToken } = request.body;

  const user = users.get(email);

  if (!user) {
    return response
      .status(401)
      .json({ 
        error: true, 
        message: 'User not found.'
      });
  }

  if (!refreshToken) {
    return response
      .status(401)
      .json({ error: true, message: 'Refresh token is required.' });
  }

  const isValidRefreshToken = checkRefreshTokenIsValid(email, refreshToken)

  if (!isValidRefreshToken) {
    return response
      .status(401)
      .json({ error: true, message: 'Refresh token is invalid.' });
  }

  invalidateRefreshToken(email, refreshToken)

  const { token, refreshToken: newRefreshToken } = generateJwtAndRefreshToken(email, {
    permissions: user.permissions,
    roles: user.roles,
  })

  return response.json({
    token,
    refreshToken: newRefreshToken,
    permissions: user.permissions,
    roles: user.roles,
  });
});

app.get('/me', checkAuthMiddleware, (request, response) => {
  const email = request.user;

  const user = users.get(email);

  if (!user) {
    return response
      .status(400)
      .json({ error: true, message: 'User not found.' });
  }

  return response.json({
    email,
    permissions: user.permissions,
    roles: user.roles,
  })
});


export default app