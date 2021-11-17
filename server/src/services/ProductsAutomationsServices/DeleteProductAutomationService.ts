import { 
  ProductsAutomationsRepository
} from '../../repositories/ProductsAutomationsRepository/PrismaProductsAutomationsRepository'

import { ProductAutomation } from '../../prisma/models/ProductAutomation'
import { AppError } from '../../errors/AppError'

interface IRequest {
  productAutomationId: string
}

export class DeleteProductAutomationService {
  public async execute({ productAutomationId }: IRequest): Promise<ProductAutomation> {
    const productsAutomationsRepository = new ProductsAutomationsRepository()

    const productAutomation = await productsAutomationsRepository
    .findById(productAutomationId)

    if(!productAutomation) {
      throw new AppError('Automação de produto não encontrada.')
    }

    const deleteResult = await productsAutomationsRepository
    .deleteProductAutomation(productAutomationId)

    return deleteResult
  }
}