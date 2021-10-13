import { generateJwtAndRefreshToken } from '../auth';
import { users } from '../database';
import { AppError } from '../errors/AppError'

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

    if (password !== user.password) {
      throw new AppError('E-mail or password incorrect.', 401)
    }

    const { token, refreshToken } = generateJwtAndRefreshToken(email)
    
    return { token, refreshToken, user }
  }
}