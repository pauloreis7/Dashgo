import { UsersRepository } from '../../repositories/UsersRepository/PrismaUsersRepository'

import { BCryptHashProvider } from '../../providers/HashProvider/BCryptHashProvider'

import { User } from '../../prisma/models/User'
import { AppError } from '../../errors/AppError'

interface IRequest {
  name: string
  email: string
  password: string
}

export class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = new UsersRepository()

    const checkUserExists = await usersRepository.findByEmail(email)

    if(checkUserExists) {
      throw new AppError('Esse e-mail já está em uso.')
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