import { getCustomRepository } from 'typeorm'
import { sign } from 'jsonwebtoken'

import { auth } from '../config/auth';

import { createRefreshToken } from '../fakeDatabase';
import { AppError } from '../errors/AppError'
import { BCryptHashProvider } from '../providers/HashProvider/BCryptHashProvider'
import { UsersRepository } from '../repositories/UsersRepository/TypeormUsersRepository'

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

    const token = sign({}, auth.secret, {
      subject: email,
      expiresIn: "1d", // 1 day
    });
  
    const refreshToken = createRefreshToken(email)

    return { token, refreshToken, user }
  }
}