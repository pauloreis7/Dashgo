import { getCustomRepository } from 'typeorm'

import { UsersRepository } from '../repositories/UsersRepository/TypeormUsersRepository'
import { BCryptHashProvider } from '../providers/HashProvider/BCryptHashProvider'
import { AppError } from '../errors/AppError'

import User from '../models/User'

interface IRequest {
  userId: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string
}

export class UpdateUserService {
  public async execute({ 
    userId,
    name,
    email,
    password,
    old_password
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findById(userId)

    if(!user) {
      throw new AppError('User not found.')
    }

    const userWithUpdatedEmail = await usersRepository.findByEmail(email)

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('E-mail already in use.')
    }

    user.name = name
    user.email = email

    if(password && !old_password) {
      throw new AppError('You need to inform the old password to set a new password.')
    }

    if(password && old_password) {
      const hashProvider = new BCryptHashProvider()

      const checkOldPassword = await hashProvider.compareHash(old_password, user.password)

      if(!checkOldPassword) {
        throw new AppError('Old password does not match.')
      }

      user.password = await hashProvider.generateHash(password)
    }

    return usersRepository.saveUser(user)
  }
}