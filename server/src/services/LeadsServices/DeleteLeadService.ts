import { LeadsRepository } from '../../repositories/LeadsRepository/PrismaLeadsRepository'

import { Lead } from '../../prisma/models/Lead'
import { AppError } from '../../errors/AppError'

interface IRequest {
  leadId: string;
}

export class DeleteLeadService {
  public async execute({ leadId }: IRequest): Promise<Lead> {
    const leadsRepository = new LeadsRepository()

    const lead = await leadsRepository.findById(leadId)

    if(!lead) {
      throw new AppError('Lead não encontrado.')
    }

    const deleteResult = await leadsRepository.deleteLead(leadId)

    return deleteResult
  }
}