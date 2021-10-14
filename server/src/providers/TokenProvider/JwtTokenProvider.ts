import { sign } from 'jsonwebtoken'

import { auth } from '../../config/auth';

import { ITokenProvider } from './ITokenProvider'

export class JwtTokenProvider implements ITokenProvider {
  public generateToken(userId: string): string {
    const token = sign({}, auth.secret, {
      subject: userId,
      expiresIn: "1d", // 1 day
    });

    return token
  }
}