import { Request, Response } from "express"

import { 
  PaginationQueryDTO, 
  ProductsAutomationsQueryDTO,
  FilterQueryDTO
} from './types/IProductsAutomationsControllerDTOs'

import { 
  ListProductsAutomationsService
} from "../services/ProductsAutomationsServices/ListProductsAutomationsService"

import { 
  FilterDaysCountProductsAutomationsService
} from "../services/ProductsAutomationsServices/FilterDaysCountProductsAutomationsService"

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

  public async daysCount(request: Request, response: Response): Promise<Response> {
    const { daysAgo } = request.query as FilterQueryDTO
    const user_id = request.user

    const  filterDaysCountProductsAutomations = 
    new FilterDaysCountProductsAutomationsService()

    const productsAutomationsCountByDaysAgo = 
    await filterDaysCountProductsAutomations.execute({ user_id, daysAgo })

    return response.json(productsAutomationsCountByDaysAgo)
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

  public async delete(request: Request, response: Response): Promise<Response> {
    const { 
      productAutomationId
    } = request.query as ProductsAutomationsQueryDTO

    const deleteProductAutomation = new DeleteProductAutomationService()

    await deleteProductAutomation.execute({ productAutomationId })

    return response.json({ delete: true })
  }
}