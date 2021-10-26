import { getCustomRepository } from 'typeorm'

import { LeadsRepository } from '../repositories/LeadsRepository/TypeormLeadsRepository'

interface IRequest {
  user_id: string;
  daysAgo: string;
}

export class FilterDaysCountLeadService { 
  public async execute({ user_id, daysAgo }: IRequest): Promise<number[]> {
    const leadsRepository = getCustomRepository(LeadsRepository)

    const leadsCountByDaysAgo = await leadsRepository.CountAllForDaysAgo({
      user_id,
      daysAgo
    })

    return leadsCountByDaysAgo
  }
}