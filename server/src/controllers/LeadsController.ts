import { Request, Response } from "express";
import { CreateLeadService } from "../services/CreateLeadService";

import { ListLeadsService } from "../services/ListLeadsService";

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
}