import { getCustomRepository } from 'typeorm'

import { LeadsRepository } from '../repositories/LeadsRepository/TypeormLeadsRepository'
import { AppError } from '../errors/AppError'

import Lead from '../models/Lead'

interface IRequest {
  leadId: string;
  name: string;
  email: string;
}

export class UpdateLeadService {
  public async execute({ leadId, email, name }: IRequest): Promise<Lead> {
    const leadsRepository = getCustomRepository(LeadsRepository)

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

    return leadsRepository.saveLead(lead)
  }
}