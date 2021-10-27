import { getCustomRepository } from 'typeorm'

import { 
  RefreshTokensRepository
} from '../../repositories/RefreshTokenRepository/TypeormRefreshJwtTokenRepository'

interface IRequest {
  refresh_token: string;
}

export class LogoutUserService {
  public async execute({ refresh_token }: IRequest): Promise<void> {
    const refreshTokensRepository = getCustomRepository(RefreshTokensRepository)

    await refreshTokensRepository.deleteRefreshTokenById(refresh_token)

    return
  }
}