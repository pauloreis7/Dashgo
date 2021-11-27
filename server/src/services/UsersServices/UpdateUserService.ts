import { UsersRepository } from '../../repositories/UsersRepository/PrismaUsersRepository'

import { BCryptHashProvider } from '../../providers/HashProvider/BCryptHashProvider'

import { User } from '../../prisma/models/User'
import { AppError } from '../../errors/AppError'

interface IRequest {
  userId: string
  name: string
  email: string
  old_password?: string
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
    const usersRepository = new UsersRepository()

    const user = await usersRepository.findById(userId)

    if(!user) {
      throw new AppError('Usuário não encontrado.')
    }

    const userWithUpdatedEmail = await usersRepository.findByEmail(email)

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Esse e-mail já está em uso.')
    }

    user.name = name
    user.email = email

    if(password && !old_password) {
      throw new AppError(
        'Você precisa informar sua senha antiga para definir uma nova senha.'
      )
    }

    if(password && old_password) {
      const hashProvider = new BCryptHashProvider()

      const checkOldPassword = await hashProvider.compareHash(old_password, user.password)

      if(!checkOldPassword) {
        throw new AppError('Senha antiga não está correta.')
      }

      user.password = await hashProvider.generateHash(password)
    }

    return usersRepository.updateUser(user)
  }
}