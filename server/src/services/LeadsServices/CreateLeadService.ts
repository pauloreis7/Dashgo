import { LeadsRepository } from '../../repositories/LeadsRepository/PrismaLeadsRepository'

import { Lead } from '../../prisma/models/Lead'
import { AppError } from '../../errors/AppError'

interface IRequest {
  user_id: string
  name: string
  email: string
}

export class CreateLeadService {
  public async execute({ user_id, name, email }: IRequest): Promise<Lead> {
    const leadsRepository = new LeadsRepository()

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