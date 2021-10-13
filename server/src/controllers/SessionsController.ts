import { Request, Response } from 'express'

import { CreateSessionDTO } from '../types';

import { AuthenticateUserService } from '../services/AuthenticateUserService'
import { RefreshUserTokenService } from '../services/RefreshUserTokenService'


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

  public async refresh(request: Request, response: Response): Promise<Response> {
    try {
      const email = request.user;
      const { refreshToken } = request.body;
    
      const refreshUserToken = new RefreshUserTokenService()

      const { token, newRefreshToken } = await refreshUserToken.execute({ 
        email, 
        refreshToken 
      })
    
      return response.json({
        token,
        refreshToken: newRefreshToken,
      });
      
    } catch (err) {
      return response.json({ error: true, message: err });
    }
  }
}