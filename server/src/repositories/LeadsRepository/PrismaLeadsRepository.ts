import { prisma } from '../../prisma'
import dayjs from 'dayjs'

import { IFilterLeadCount } from './DTOs/IFilterLeadCount'
import { ICreateLeadDTO } from './DTOs/ICreateLeadDTO'
import { IUpdateLeadDTO } from './DTOs/IUpdateLeadDTO'


export class LeadsRepository {
    
  public async findAll(user_id: string) {
    const leads = await prisma.lead.findMany({
      where: { user_id }
    })

    return leads
  }

  public async CountAllForDaysAgo({ user_id, daysAgo }: IFilterLeadCount) {
    const defaultArray = Array.from(Array(Number(daysAgo)))

    const DaysToCount = defaultArray.map((_, index) => {
      const from = dayjs().subtract(index, 'day').format('YYYY-MM-DD [00:00:00.000]')
      const to = dayjs().subtract(index, 'day').format('YYYY-MM-DD [23:59:00.000]')

      return { from, to }
    })

    const leads = await Promise.all(
      DaysToCount.map((DayToCount) => {
        const count = prisma.lead.count({
          where: {
            user_id,
            AND: {
              created_at: DayToCount.from
            }
          }
        })

        return count
      })
    )

    // const leadsold = await Promise.all(
    //   DaysToCount.map((DayToCount) => {
    //     const count = this.count({
    //       where: { 
    //         user_id, 
    //         created_at: Between(
    //           new Date(DayToCount.from),
    //           new Date(DayToCount.to)
    //         )
    //       },
    //     })

    //     return count
    //   })
    // )

    const orderLeads = leads.reverse()

    return orderLeads
  }

  public async findById(id: string) {
    const lead = await prisma.lead.findUnique({
      where: { id }
    })

    return lead
  }

  public async findByEmail(email: string) {
    const lead = await prisma.lead.findUnique({
      where: { email }
    })

    return lead
  }

  public async createLead({ name, email, user_id }: ICreateLeadDTO) {
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        user_id
      }
    })

    return lead
  }

  public async updateLead({ id, name, email }: IUpdateLeadDTO) {
    const lead = await prisma.lead.update({
      where: { id },
      data: {
        name,
        email
      }
    }) 

    return lead
  }

  public async deleteLead(id: string) {
    const lead = await prisma.lead.delete({
      where: { id }
    })

    return lead
  }
}