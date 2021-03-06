import { Request, Response } from 'express'

import { CreateSessionDTO } from './types/ISessionsControllerDTOs'

import { AuthenticateUserService } from '../services/SessionsServices/AuthenticateUserService'
import { RefreshUserTokenService } from '../services/SessionsServices/RefreshUserTokenService'
import { LogoutUserService } from '../services/SessionsServices/LogoutUserService'

export class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body as CreateSessionDTO

    const authenticateUser = new AuthenticateUserService()

    const { token, refreshToken, user } = await authenticateUser.execute({ 
      email,
      password 
    })

    return response.json({
      user,
      token,
      refreshToken
    })
  }

  public async refresh(request: Request, response: Response): Promise<Response> {
    const { refresh_token } = request.body

    const refreshUserToken = new RefreshUserTokenService()

    const { token, newRefreshToken } = await refreshUserToken.execute({
      refresh_token
    })

    return response.json({
      token,
      refreshToken: newRefreshToken,
    })
  }

  public async logout(request: Request, response: Response): Promise<Response> {
    const { refresh_token } = request.body

    const logoutUserService = new LogoutUserService()

    await logoutUserService.execute({ refresh_token })

    return response.json({ logout: true })
  }
}