import { Repository, EntityRepository } from 'typeorm'

import { ICreateUserDTO } from './ICreateUserDTO'

import User from '../../models/User'

@EntityRepository(User)
export class UsersRepository extends Repository<User>  {
  
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne(id)

    return user
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({ where: { email } })

    return user
  }

  public async createUser(userData: ICreateUserDTO): Promise<User> {
    const user = this.create(userData)
    
    await this.save(user)

    return user
  }

  public async saveUser(user: User): Promise<User> {
    return await this.save(user)
  }
}