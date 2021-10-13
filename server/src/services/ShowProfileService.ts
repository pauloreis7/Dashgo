import { users } from '../database';
import { AppError } from '../errors/AppError'

import User from '../models/User'

interface IRequest {
  email: string
}

export class ShowProfileService {
  public async execute({ email }: IRequest): Promise<User> {
    const user = users.get(email);

    if(!user) {
      throw new AppError('User not found.')
    }

    return user
  }
}