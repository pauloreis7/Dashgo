import { getCustomRepository } from 'typeorm'

import { UsersRepository } from '../repositories/UsersRepository/TypeormUsersRepository'
import { BCryptHashProvider } from '../providers/HashProvider/BCryptHashProvider'
import { AppError } from '../errors/AppError'

import User from '../models/User'

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)

    const checkUserExists = await usersRepository.findByEmail(email)

    if(checkUserExists) {
      throw new AppError('Email address already used.')
    }

    const hashProvider = new BCryptHashProvider()

    const hashedPassword = await hashProvider.generateHash(password)

    const user = await usersRepository.createUser({
      name,
      email,
      password: hashedPassword
    })

    return user
  }
}