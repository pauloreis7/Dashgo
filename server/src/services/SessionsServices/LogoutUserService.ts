import { 
  RefreshTokensRepository
} from '../../repositories/RefreshTokensRepository/PrismaRefreshJwtRepository'

import { AppError } from '../../errors/AppError'

interface IRequest {
  refresh_token: string
}

export class LogoutUserService {
  public async execute({ refresh_token }: IRequest): Promise<void> {
    const refreshTokensRepository = new RefreshTokensRepository()

    const refreshToken = await refreshTokensRepository.findById(refresh_token)
    
    if (!refreshToken) {
      throw new AppError('Refresh token está inválido')
    }

    await refreshTokensRepository.deleteRefreshTokenById(refresh_token)

    return
  }
}