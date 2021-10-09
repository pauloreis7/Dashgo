import { Request, Response } from 'express';

import { users } from '../database';

export class UsersController {
  public show(request: Request, response: Response) {
    const email = request.user;

    const user = users.get(email);

    if (!user) {
      return response
        .status(400)
        .json({ error: true, message: 'User not found.' });
    }

    return response.json({
      email,
      permissions: user.permissions,
      roles: user.roles,
    })
  }
}