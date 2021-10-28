import { LeadsRepository } from '../../repositories/LeadsRepository/PrismaLeadsRepository'

import { Lead } from '../../prisma/models/Lead'

interface IRequest {
  user_id: string;
}

export class ListLeadsService {
  public async execute({ user_id }: IRequest): Promise<Lead[]> {
    const leadsRepository = new LeadsRepository()

    const leads = await leadsRepository.findAll(user_id)

    return leads
  }
}