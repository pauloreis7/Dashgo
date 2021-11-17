import { 
  ProductsAutomationsRepository
} from '../../repositories/ProductsAutomationsRepository/PrismaProductsAutomationsRepository'

import { ProductAutomation } from '../../prisma/models/ProductAutomation'

interface IRequest {
  user_id: string
  page: string
  per_page: string
}

interface IResponse {
  productsAutomations: ProductAutomation[]
  total: number
}

export class ListProductsAutomationsService {
  public async execute({ user_id, page, per_page }: IRequest): Promise<IResponse> {
    const productsAutomationsRepository = new ProductsAutomationsRepository()

    const productsAutomations = await productsAutomationsRepository.pagination({
      user_id,
      page,
      per_page
    })

    const total = productsAutomations[0]?.user._count?.productsAutomations ?? 0

    return { total, productsAutomations }
  }
}