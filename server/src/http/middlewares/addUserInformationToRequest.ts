import { NextFunction, Request, Response } from 'express';
import decode from 'jwt-decode'

import { IDecodedToken } from './IDecodedToken';

export function addUserInformationToRequest(
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
    const decoded = decode(token as string) as IDecodedToken;

    request.user = decoded.sub;

    return next();
  } catch (err) {
    return response 
      .status(401)
      .json({ error: true, code: 'token.invalid', message: 'Invalid token format.' })
  }
}