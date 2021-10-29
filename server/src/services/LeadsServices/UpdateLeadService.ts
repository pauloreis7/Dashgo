import { LeadsRepository } from '../../repositories/LeadsRepository/PrismaLeadsRepository'

import { Lead } from '../../prisma/models/Lead'
import { AppError } from '../../errors/AppError'

interface IRequest {
  leadId: string
  name: string
  email: string
}

export class UpdateLeadService {
  public async execute({ leadId, email, name }: IRequest): Promise<Lead> {
    const leadsRepository = new LeadsRepository()

    const lead = await leadsRepository.findById(leadId)

    if(!lead) {
      throw new AppError('Lead não encontrado.')
    }

    const leadWithUpdatedEmail = await leadsRepository.findByEmail(email)

    if(leadWithUpdatedEmail && leadWithUpdatedEmail.id !== lead.id) {
      throw new AppError('Esse e-mail já está em uso.')
    }

    lead.name = name
    lead.email = email

    const updatedLead = leadsRepository.updateLead(lead)

    return updatedLead
  }
}