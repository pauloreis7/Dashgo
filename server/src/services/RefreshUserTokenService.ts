import { generateJwtAndRefreshToken } from '../auth';
import { checkRefreshTokenIsValid, users, invalidateRefreshToken } from '../database';


interface IRequest {
  email: string;
  refreshToken: string | undefined;
}

interface IResponse {
  token: string;
  newRefreshToken: string
}

export class RefreshUserTokenService {
  public async execute({ email, refreshToken }: IRequest): Promise<IResponse> {
    const user = users.get(email);
  
    if (!user) {
      throw new Error('User not found.')
    }
  
    if (!refreshToken) {
      throw new Error('Refresh token is required')
    }
  
    const isValidRefreshToken = checkRefreshTokenIsValid(email, refreshToken)
  
    if (!isValidRefreshToken) {
      throw new Error('Refresh token is invalid')
    }
  
    invalidateRefreshToken(email, refreshToken)
  
    const { token, refreshToken: newRefreshToken } = generateJwtAndRefreshToken(email)

    return { token, newRefreshToken }
  }
}