import { getCustomRepository } from 'typeorm'

import { AppError } from '../errors/AppError'
import { BCryptHashProvider } from '../providers/HashProvider/BCryptHashProvider'
import { JwtTokenProvider } from '../providers/TokenProvider/JwtTokenProvider';
import { UsersRepository } from '../repositories/UsersRepository/TypeormUsersRepository'
import { 
  RefreshTokensRepository
} from '../repositories/RefreshTokenRepository/TypeormRefreshJwtTokenRepository'

import User from '../models/User'
import RefreshToken from '../models/RefreshToken'

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
  refreshToken: RefreshToken;
}

export class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository)
    
    const user = await usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('E-mail or password incorrect.', 401)
    }

    const hashProvider = new BCryptHashProvider()

    const passwordMatched = await hashProvider.compareHash(password, user.password)

    if (!passwordMatched) {
      throw new AppError('E-mail or password incorrect.', 401)
    }

    const tokenProvider = new JwtTokenProvider()
    const token = tokenProvider.generateToken(user.id)
  
    const refreshTokensRepository = getCustomRepository(RefreshTokensRepository)

    const refreshToken = await refreshTokensRepository.generateRefreshToken(user.id)

    return { token, refreshToken, user }
  }
}