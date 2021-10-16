import { Repository, EntityRepository, DeleteResult } from 'typeorm'

import { ICreateLeadDTO } from './ICreateLeadDTO'

import Lead from '../../models/Lead'

@EntityRepository(Lead)
export class LeadsRepository extends Repository<Lead> {
    
  public async findAll(user_id: string): Promise<Lead[]> {
    const leads = await this.find({
      where: { user_id }
    })

    return leads
  }

  public async findById(id: string): Promise<Lead | undefined> {
    const lead = await this.findOne(id)

    return lead
  }

  public async findByEmail(email: string): Promise<Lead | undefined> {
    const lead = await this.findOne({
      where: { email }
    })

    return lead
  }

  public async createLead({ name, email, user_id }: ICreateLeadDTO): Promise<Lead> {
    const lead = this.create({ name, email, user_id })

    await this.save(lead)

    return lead
  }

  public async saveLead(lead: Lead): Promise<Lead> {
    return await this.save(lead)
  }

  public async deleteLead(id: string): Promise<DeleteResult> {
    return await this.delete(id)
  }
}
