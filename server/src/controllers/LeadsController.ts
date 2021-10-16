import { Request, Response } from "express";
import { CreateLeadService } from "../services/CreateLeadService";

export class LeadsController {

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