import { Request, Response } from 'express';

import { ShowProfileService } from '../services/ShowProfileService'

export class UsersController {
  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const email = request.user;

      const showProfile = new ShowProfileService()

      const user = await showProfile.execute({ email })

      return response.json(user)
    } catch (err) {
      return response
        .status(400)
        .json({ error: true, message: 'User not found.' });
    }
  }
}