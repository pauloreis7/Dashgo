import { LeadsRepository } from '../../repositories/LeadsRepository/PrismaLeadsRepository'

interface IRequest {
  user_id: string
  daysAgo: string
}

export class FilterDaysCountLeadService { 
  public async execute({ user_id, daysAgo }: IRequest): Promise<number[]> {
    const leadsRepository = new LeadsRepository()

    const leadsCountByDaysAgo = await leadsRepository.countAllForDaysAgo({
      user_id,
      daysAgo
    })
    
    return leadsCountByDaysAgo
  }
}