import { 
  RefreshTokensRepository
} from '../../repositories/RefreshTokensRepository/PrismaRefreshJwtRepository'
import { UsersRepository } from '../../repositories/UsersRepository/PrismaUsersRepository'

import { BCryptHashProvider } from '../../providers/HashProvider/BCryptHashProvider'
import { JwtTokenProvider } from '../../providers/TokenProvider/JwtTokenProvider';

import { RefreshToken } from '../../prisma/models/RefreshToken'
import { User } from '../../prisma/models/User'
import { AppError } from '../../errors/AppError'

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
    const usersRepository = new UsersRepository()
    
    const user = await usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('E-mail ou senha incorreto.', 401)
    }

    const hashProvider = new BCryptHashProvider()

    const passwordMatched = await hashProvider.compareHash(password, user.password)
    
    if (!passwordMatched) {
      throw new AppError('E-mail ou senha incorreto.', 401)
    }

    const tokenProvider = new JwtTokenProvider()
    const token = tokenProvider.generateToken(user.id)
  
    const refreshTokensRepository = new RefreshTokensRepository()

    const refreshToken = await refreshTokensRepository.generateRefreshToken(user.id)

    return { token, refreshToken, user }
  }
}