import { LeadsRepository } from '../../repositories/LeadsRepository/PrismaLeadsRepository'

import { Lead } from '../../prisma/models/Lead'

interface IRequest {
  user_id: string
  page: string
  per_page: string
}

interface IResponse {
  leads: Lead[]
  total: number
}

export class ListLeadsService {
  public async execute({ user_id, page, per_page }: IRequest): Promise<IResponse> {
    const leadsRepository = new LeadsRepository()

    const leads = await leadsRepository.pagination({
      user_id,
      page,
      per_page
    })

    const total = leads.length

    return { total, leads }
  }
}