import { Repository, EntityRepository, DeleteResult } from 'typeorm'
import dayjs from 'dayjs'

import RefreshToken from '../../models/RefreshToken'

@EntityRepository(RefreshToken)
export class RefreshTokensRepository extends Repository<RefreshToken> {

  public async findById(refreshTokenId: string): Promise<RefreshToken | undefined> {
    const refreshToken = await this.findOne(refreshTokenId)

    return refreshToken
  }

  public async generateRefreshToken(userId: string): Promise<RefreshToken> {
    const expires_in = dayjs().add(15, 'minute').unix()

    const refreshToken = this.create({ expires_in, user_id: userId })

    await this.save(refreshToken)

    return refreshToken
  }

  public async deleteRefreshToken(userId: string): Promise<DeleteResult> {
    return await this.delete(userId)
  }
}