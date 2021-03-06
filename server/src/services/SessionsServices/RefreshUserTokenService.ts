import dayjs from 'dayjs'

import { 
  RefreshTokensRepository
} from '../../repositories/RefreshTokensRepository/PrismaRefreshJwtRepository'

import { JwtTokenProvider } from '../../providers/TokenProvider/JwtTokenProvider'

import { AppError } from '../../errors/AppError'
import { RefreshToken } from '../../prisma/models/RefreshToken'

interface IRequest {
  refresh_token: string
}

interface IResponse {
  token: string
  newRefreshToken: RefreshToken
}

export class RefreshUserTokenService {
  public async execute({ refresh_token }: IRequest): Promise<IResponse> {
    const refreshTokensRepository = new RefreshTokensRepository()

    const refreshToken = await refreshTokensRepository.findById(refresh_token)

    if (!refreshToken) {
      throw new AppError('Refresh token está inválido', 401)
    }

    const tokenProvider = new JwtTokenProvider()
    const token = tokenProvider.generateToken(refreshToken.user_id)
    
    const isRefreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expires_in))

    if(isRefreshTokenExpired) {
      await refreshTokensRepository.deleteRefreshTokenByUserId(refreshToken.user_id)

      const newRefreshToken = await refreshTokensRepository
      .generateRefreshToken(refreshToken.user_id)

      return { token, newRefreshToken }
    }
    
    return { token, newRefreshToken: refreshToken }
  }
}