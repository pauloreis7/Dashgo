import { Request, Response } from 'express';

import { CreateUserService } from '../services/CreateUserService'
import { ShowProfileService } from '../services/ShowProfileService'

export class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body

      const createUser = new CreateUserService()

      const user = await createUser.execute({ name, email, password })

      return response.json(user)

    } catch (err) {
      const error = Object(err)

      return response
        .status(error.statusCode)
        .json({ error: true, ...error });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request.user;

      const showProfile = new ShowProfileService()

      const user = await showProfile.execute({ userId })

      return response.json(user)
      
    } catch (err) {
      const error = Object(err)

      return response
        .status(error.statusCode)
        .json({ error: true, ...error });
    }
  }
}