import { prisma } from '../../prisma'

import { ICreateUserDTO } from './DTOs/ICreateUserDTO'
import { IUpdateUserDTO } from './DTOs/IUpdateUserDTO'

export class UsersRepository {
  
  public async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id }
    })

    return user
  }

  public async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    return user
  }

  public async createUser({ name, email, password }: ICreateUserDTO) {
    const user = await prisma.user.create({
      data: {
        name, 
        email,
        password
      }
    })

    return user
  }

  public async updateUser({ id, name, email, password }: IUpdateUserDTO) {
    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password,
      }
    })

    return user
  }
}