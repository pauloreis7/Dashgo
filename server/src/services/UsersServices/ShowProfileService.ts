import { UsersRepository } from '../../repositories/UsersRepository/PrismaUsersRepository'

import { User } from '../../prisma/models/User'
import { AppError } from '../../errors/AppError'

interface IRequest {
  userId: string
}

export class ShowProfileService {
  public async execute({ userId }: IRequest): Promise<User> {
    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(userId)

    if(!user) {
      throw new AppError('User not found.')
    }

    return user
  }
}