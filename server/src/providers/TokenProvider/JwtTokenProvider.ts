import { sign } from 'jsonwebtoken'

import { auth } from '../../config/auth';

import { ITokenProvider } from './ITokenProvider'

export class JwtTokenProvider implements ITokenProvider {
  public generateToken(userId: string): string {
    const token = sign({}, auth.secret, {
      subject: userId,
      expiresIn: "15m",
    });

    return token
  }
}