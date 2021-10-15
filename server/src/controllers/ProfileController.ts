import { Request, Response } from 'express';

import { ShowProfileService } from '../services/ShowProfileService'

export class UsersController {
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