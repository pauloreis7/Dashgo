import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken'
import { auth } from '../../config/auth';

import { IDecodedToken } from './IDecodedToken';

export function checkAuthMiddleware(
    request: Request, 
    response: Response, 
    next: NextFunction
  ) {
  const { authorization } = request.headers;
  if (!authorization) {
    return response
      .status(401)
      .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
  }

  const [, token] = authorization?.split(' ');

  if (!token) {
    return response 
      .status(401)
      .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
  }

  try {
    const { sub } = verify(token as string, auth.secret) as IDecodedToken;
    
    request.user = sub;

    return next();
  } catch (err) {

    return response
      .status(401)
      .json({  error: true, code: 'token.expired', message: 'Token invalid.' })
  }
}