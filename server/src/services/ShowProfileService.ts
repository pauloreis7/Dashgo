import { users } from '../database';

import User from '../models/User'

interface IRequest {
  email: string
}

export class ShowProfileService {
  public async execute({ email }: IRequest): Promise<User> {
    const user = users.get(email);

    if(!user) {
      throw new Error()
    }

    return user
  }
}