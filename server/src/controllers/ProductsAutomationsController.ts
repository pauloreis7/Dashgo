import { Request, Response } from "express"

import { 
  PaginationQueryDTO, 
  ProductsAutomationsQueryDTO
} from './types/IProductsAutomationsControllerDTOs'

import { 
  ListProductsAutomationsService
} from "../services/ProductsAutomationsServices/ListProductsAutomationsService"

import { 
  CreateProductAutomationService 
} from "../services/ProductsAutomationsServices/CreateProductAutomationService"

import { 
  DeleteProductAutomationService 
} from "../services/ProductsAutomationsServices/DeleteProductAutomationService"

export class ProductsAutomationsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page = '1', per_page = '10' } = request.query as PaginationQueryDTO
    const user_id = request.user

    const listProductsAutomations = new ListProductsAutomationsService()

    const { 
      total, 
      productsAutomations 
    } = await listProductsAutomations.execute({ user_id, page, per_page })

    response.set('x-total-count', String(total))
    response.set('Access-Control-Expose-Headers', 'x-total-count')

    return response.json(productsAutomations)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body
    const user_id = request.user

    const createProductAutomation = new CreateProductAutomationService()

    const productAutomation = await createProductAutomation.execute({
      user_id,
      name,
      description
    })

    return response.json(productAutomation)
  }

 
}