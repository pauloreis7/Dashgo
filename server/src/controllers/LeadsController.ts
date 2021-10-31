import { Request, Response } from "express"

import { PaginationQueryDTO, LeadQueryDTO, FilterQueryDTO } from './types/ILeadsControllerDTOs'

import { ListLeadsService } from "../services/LeadsServices/ListLeadsService"
import { FilterDaysCountLeadService } from "../services/LeadsServices/FilterDaysCountLeadService"
import { CreateLeadService } from "../services/LeadsServices/CreateLeadService"
import { UpdateLeadService } from "../services/LeadsServices/UpdateLeadService"
import { DeleteLeadService } from "../services/LeadsServices/DeleteLeadService"

export class LeadsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page = '1', per_page = '10' } = request.query as PaginationQueryDTO
    const user_id = request.user

    const listLeads = new ListLeadsService()

    const { total, leads } = await listLeads.execute({ user_id, page, per_page })

    response.set('x-total-count', String(total))
    response.set('Access-Control-Expose-Headers', 'x-total-count')

    return response.json(leads)
  }

  public async daysCount(request: Request, response: Response): Promise<Response> {
    const { daysAgo } = request.query as FilterQueryDTO
    const user_id = request.user

    const filterDaysCountLead = new FilterDaysCountLeadService()

    const leadsCountByDaysAgo = await filterDaysCountLead.execute({ user_id, daysAgo })

    return response.json(leadsCountByDaysAgo)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body
    const user_id = request.user

    const createLead = new CreateLeadService()

    const lead = await createLead.execute({
      user_id,
      name,
      email
    })

    return response.json(lead)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { leadId } = request.query as LeadQueryDTO
    const { name, email } = request.body

    const updateLead = new UpdateLeadService()

    const lead = await updateLead.execute({
      leadId,
      name,
      email
    })

    return response.json(lead)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { leadId } = request.query as LeadQueryDTO

    const deleteLead = new DeleteLeadService()

    await deleteLead.execute({ leadId })

    return response.json({ delete: true })
  }
}