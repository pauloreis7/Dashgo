import { prisma } from '../../prisma'
import dayjs from 'dayjs'

export class RefreshTokensRepository {

  public async findById(refreshTokenId: string) {
    const refreshToken = await prisma.refresh_token.findUnique({
      where: { id: refreshTokenId }
    })

    return refreshToken
  }

  public async generateRefreshToken(userId: string) {
    const expires_in = dayjs().add(15, 'day').unix()

    const refreshToken = await prisma.refresh_token.create({
      data: {
        expires_in,
        user_id: userId
      }
    })

    return refreshToken
  }

  public async deleteRefreshTokenByUserId(userId: string) {
    const refreshToken = await prisma.refresh_token.delete({
      where: { user_id: userId }
    })

    return refreshToken
  }

  public async deleteRefreshTokenById(RefreshTokenId: string) {
    const refreshToken = await prisma.refresh_token.delete({
      where: { id: RefreshTokenId }
    })

    return refreshToken
  }
}