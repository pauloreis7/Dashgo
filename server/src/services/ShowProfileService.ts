import { getCustomRepository } from 'typeorm'

import { AppError } from '../errors/AppError'
import { UsersRepository } from '../repositories/UsersRepository/TypeormUsersRepository'

import User from '../models/User'

interface IRequest {
  email: string
}

export class ShowProfileService {
  public async execute({ email }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findByEmail(email)

    if(!user) {
      throw new AppError('User not found.')
    }

    return user
  }
}