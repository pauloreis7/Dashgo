import { Repository, EntityRepository, DeleteResult, Between } from 'typeorm'
import dayjs from 'dayjs'

import { ICreateLeadDTO } from './ICreateLeadDTO'
import { IFilterLeadCount } from './IFilterLeadCount'

import Lead from '../../models/Lead'

@EntityRepository(Lead)
export class LeadsRepository extends Repository<Lead> {
    
  public async findAll(user_id: string): Promise<Lead[]> {
    const leads = await this.find({
      where: { user_id }
    })

    return leads
  }

  public async CountAllForDaysAgo({ user_id, daysAgo }: IFilterLeadCount): Promise<number[]> {
    const defaultArray = Array.from(Array(Number(daysAgo)))

    const DaysToCount = defaultArray.map((_, index) => {
      const from = dayjs().subtract(index, 'day').format('YYYY-MM-DD [00:00:00.000]')
      const to = dayjs().subtract(index, 'day').format('YYYY-MM-DD [23:59:00.000]')

      return { from, to }
    })

    const leads = await Promise.all(
      DaysToCount.map((DayToCount) => {
        const count = this.count({
          where: { 
            user_id, 
            created_at: Between(
              new Date(DayToCount.from),
              new Date(DayToCount.to)
            )
          },
        })

        return count
      })
    )

    const orderLeads = leads.reverse()

    return orderLeads
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
