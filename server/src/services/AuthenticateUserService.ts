import { generateJwtAndRefreshToken } from '../auth';
import { users } from '../database';
import { AppError } from '../errors/AppError'
import { BCryptHashProvider } from '../providers/HashProvider/BCryptHashProvider'

import User from '../models/User'

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
  refreshToken: string
}

export class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = users.get(email);

    if (!user) {
      throw new AppError('E-mail or password incorrect.', 401)
    }

    const hashProvider = new BCryptHashProvider()

    const passwordMatched = await hashProvider.compareHash(password, user.password)

    if (!passwordMatched) {
      throw new AppError('E-mail or password incorrect.', 401)
    }

    const { token, refreshToken } = generateJwtAndRefreshToken(email)
    
    return { token, refreshToken, user }
  }
}