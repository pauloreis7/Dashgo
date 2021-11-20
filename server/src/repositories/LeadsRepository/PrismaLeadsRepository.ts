import dayjs from 'dayjs'

import { prisma } from '../../prisma'

import { IPaginateLeadDTO } from './DTOs/IPaginateLeadDTO'
import { IFilterLeadCount } from './DTOs/IFilterLeadCount'
import { ICreateLeadDTO } from './DTOs/ICreateLeadDTO'
import { IUpdateLeadDTO } from './DTOs/IUpdateLeadDTO'

export class LeadsRepository {
    
  public async pagination({ user_id, page, per_page }: IPaginateLeadDTO) {
    const pageStart = (Number(page) - 1) * Number(per_page)

    const leads = await prisma.lead.findMany({
      skip: pageStart,
      take: Number(per_page),
      where: { user_id },
      orderBy: { created_at: 'desc' },
      include: { users: { select: { _count: true } } }
    })

    return leads
  }

  public async countAllForDaysAgo({ user_id, daysAgo }: IFilterLeadCount) {
    const defaultArray = Array.from(Array(Number(daysAgo)))

    const daysToCount = defaultArray.map((_, index) => {
      const from = dayjs().subtract(index, 'day').format('YYYY-MM-DD[T00:00]')
      const to = dayjs().subtract(index, 'day').format('YYYY-MM-DD[T23:59]')

      return { from, to }
    })

    const leads = await Promise.all(
      daysToCount.map((dayToCount) => {
        const count = prisma.lead.count({
          where: {
            user_id,
            AND: {
              created_at: { 
                gte: new Date(dayToCount.from),
                lte: new Date(dayToCount.to),
              },
            },
          }
        })

        return count
      })
    )

    const orderLeads = leads.reverse()

    return orderLeads
  }

  public async findById(id: string) {
    const lead = await prisma.lead.findUnique({
      where: { id }
    })

    return lead
  }

  public async findByEmail(email: string, user_id?: string) {
    const lead = await prisma.lead.findFirst({
      where: { email, AND: { user_id } }
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
        email,
        updated_at: new Date()
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
