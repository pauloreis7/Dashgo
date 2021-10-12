import { Request, Response } from 'express'

import { generateJwtAndRefreshToken } from '../auth';
import { checkRefreshTokenIsValid, users, invalidateRefreshToken } from '../database';
import { CreateSessionDTO } from '../types';

export class SessionsController {
  public create(request: Request, response: Response): Response {
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
  }

  public refresh(request: Request, response: Response): Response {
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
  }
}