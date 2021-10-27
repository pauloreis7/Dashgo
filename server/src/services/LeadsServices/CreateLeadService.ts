import { getCustomRepository } from 'typeorm'

import { LeadsRepository } from '../../repositories/LeadsRepository/TypeormLeadsRepository'
import { AppError } from '../../errors/AppError'

import Lead from '../../models/Lead'

interface IRequest {
  user_id: string;
  name: string;
  email: string;
}

export class CreateLeadService {
  public async execute({ user_id, name, email }: IRequest): Promise<Lead> {
    const leadsRepository = getCustomRepository(LeadsRepository)

    const checkLeadExists = await leadsRepository.findByEmail(email)
    
    if(checkLeadExists) {
      throw new AppError('Esse e-mail já está em uso.')
    }

    const lead = await leadsRepository.createLead({
      user_id,
      name,
      email
    })

    return lead
  }
}