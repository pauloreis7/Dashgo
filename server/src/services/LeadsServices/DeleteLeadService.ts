import { getCustomRepository } from 'typeorm'

import { LeadsRepository } from '../../repositories/LeadsRepository/TypeormLeadsRepository'

interface IRequest {
  leadId: string;
}

export class DeleteLeadService {
  public async execute({ leadId }: IRequest): Promise<void> {
    const leadsRepository = getCustomRepository(LeadsRepository)

    await leadsRepository.deleteLead(leadId)

    return
  }
}