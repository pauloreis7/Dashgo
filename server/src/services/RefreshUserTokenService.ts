import { getCustomRepository } from 'typeorm'

import { createRefreshToken } from '../fakeDatabase';
import { checkRefreshTokenIsValid, invalidateRefreshToken } from '../fakeDatabase';
import { UsersRepository } from '../repositories/UsersRepository/TypeormUsersRepository'
import { JwtTokenProvider } from '../providers/TokenProvider/JwtTokenProvider';
import { 
  RefreshTokensRepository
} from '../repositories/RefreshTokenRepository/TypeormRefreshJwtTokenRepository'
import { AppError } from '../errors/AppError'

import RefreshToken from '../models/RefreshToken'

interface IRequest {
  email: string;
  refreshToken: string | undefined;
}

interface IResponse {
  token: string;
  newRefreshToken: RefreshToken
}

export class RefreshUserTokenService {
  public async execute({ email, refreshToken }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User not found.', 401)
    }
  
    if (!refreshToken) {
      throw new AppError('Refresh token is required', 401)
    }

    const refreshTokensRepository = getCustomRepository(RefreshTokensRepository)

    const isValidRefreshToken = await refreshTokensRepository.findById(refreshToken)

    if (!isValidRefreshToken) {
      throw new AppError('Refresh token is invalid', 401)
    }

    await refreshTokensRepository.deleteRefreshToken(user.id)
  
    const tokenProvider = new JwtTokenProvider()
    const token = tokenProvider.generateToken(user.id)
  
    const newRefreshToken = await refreshTokensRepository.generateRefreshToken(user.id)

    return { token, newRefreshToken }
  }
}