import { 
  ProductsAutomationsRepository
} from '../../repositories/ProductsAutomationsRepository/PrismaProductsAutomationsRepository'

interface IRequest {
  user_id: string
  daysAgo: string
}

export class FilterDaysCountProductsAutomationsService { 
  public async execute({ user_id, daysAgo }: IRequest): Promise<number[]> {
    const productsAutomationsRepository = new ProductsAutomationsRepository()

    const productsAutomationsCountByDaysAgo = 
    await productsAutomationsRepository.countAllForDaysAgo({
      user_id,
      daysAgo
    })
    
    return productsAutomationsCountByDaysAgo
  }
}