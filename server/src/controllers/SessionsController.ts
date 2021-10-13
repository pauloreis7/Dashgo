import { Request, Response } from 'express'

import { generateJwtAndRefreshToken } from '../auth';
import { checkRefreshTokenIsValid, users, invalidateRefreshToken } from '../database';
import { CreateSessionDTO } from '../types';

import { AuthenticateUserService } from '../services/AuthenticateUserService'


export class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body as CreateSessionDTO;

      const authenticateUser = new AuthenticateUserService()

      const { token, refreshToken, user } = await authenticateUser.execute({ 
        email,
        password 
      })

      return response.json({
        user,
        token,
        refreshToken
      });
    } catch (err) {
      return response
        .status(401)
        .json({ 
          error: true, 
          message: 'E-mail or password incorrect.'
        });
    }
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
  
    const { token, refreshToken: newRefreshToken } = generateJwtAndRefreshToken(email)
  
    return response.json({
      token,
      refreshToken: newRefreshToken,
    });
  }
}