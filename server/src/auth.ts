import jwt from 'jsonwebtoken'

import { auth } from './config/auth';
import { createRefreshToken } from './fakeDatabase';

export function generateJwtAndRefreshToken(email: string, payload: object = {}) {
  const token = jwt.sign(payload, auth.secret, {
    subject: email,
    expiresIn: "1d", // 1 day
  });

  const refreshToken = createRefreshToken(email)

  return {
    token,
    refreshToken,
  }
}
