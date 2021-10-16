import { Request, Response } from "express";
import { CreateLeadService } from "../services/CreateLeadService";

import { ListLeadsService } from "../services/ListLeadsService";
import { UpdateLeadService } from "../services/UpdateLeadService";
import { DeleteLeadService } from "../services/DeleteLeadService";

type LeadQueryDTO = {
  leadId: string;
}

export class LeadsController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user

      const listLeads = new ListLeadsService()

      const leads = await listLeads.execute({ user_id })

      return response.json(leads)

    } catch (err) {
      const error = Object(err)

      return response
        .status(error.statusCode)
        .json({ error: true, ...error });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email } = request.body
      const user_id = request.user

      const createLead = new CreateLeadService()

      const lead = await createLead.execute({
        user_id,
        name,
        email
      })

      return response.json(lead)

    } catch (err) {
      const error = Object(err)

      return response
        .status(error.statusCode)
        .json({ error: true, ...error });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { leadId } = request.query as LeadQueryDTO
      const { name, email } = request.body

      const updateLead = new UpdateLeadService()

      const lead = await updateLead.execute({
        leadId,
        name,
        email
      })

      return response.json(lead)

    } catch (err) {
      const error = Object(err)

      return response
        .status(error.statusCode)
        .json({ error: true, ...error });
    }  
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { leadId } = request.query as LeadQueryDTO

      const deleteLead = new DeleteLeadService()

      await deleteLead.execute({ leadId })

      return response.json({ delete: true });

    } catch (err) {
      const error = Object(err)

      return response
        .status(error.statusCode)
        .json({ error: true, ...error });
    }  
  }
}