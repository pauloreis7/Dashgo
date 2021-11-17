import { 
  ProductsAutomationsRepository
} from '../../repositories/ProductsAutomationsRepository/PrismaProductsAutomationsRepository'

import { ProductAutomation } from '../../prisma/models/ProductAutomation'
import { AppError } from '../../errors/AppError'

interface IRequest {
  name: string
  description: string
  user_id: string
}

export class CreateProductAutomationService {
  public async execute({ user_id, name, description }: IRequest): Promise<ProductAutomation> {
    const productsAutomationsRepository = new ProductsAutomationsRepository()

    const checkproductAutomationExists = await productsAutomationsRepository
    .findByName(name)
    
    if(
        checkproductAutomationExists 
        && checkproductAutomationExists.user_id === user_id
      ) {
      throw new AppError('Esse nome já está em uso.')
    }

    const productAutomation = await productsAutomationsRepository
    .createProductAutomation({
      user_id,
      name,
      description
    })

    return productAutomation
  }
}