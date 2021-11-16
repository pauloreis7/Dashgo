import { prisma } from '../../prisma'

import { ICreateProductAutomationDTO } from './DTOs/ICreateProductAutomationDTO'
import { IPaginateProductAutomationDTO } from './DTOs/IPaginateProductAutomationDTO'

export class ProductsAutomationsRepository {
  public async pagination({ user_id, page, per_page }: IPaginateProductAutomationDTO) {
    const pageStart = (Number(page) - 1) * Number(per_page)

    const productsAutomations = await prisma.productAutomation.findMany({
      skip: pageStart,
      take: Number(per_page),
      where: { user_id },
      orderBy: { created_at: 'desc' },
      include: { user: { select: { _count: true } } }
    })

    return productsAutomations
  }
  
  public async findById(id: string) {
    const productAutomation = await prisma.productAutomation.findUnique({
      where: { id }
    })

    return productAutomation
  }

  public async findByName(name: string) {
    const productAutomation = await prisma.productAutomation.findUnique({
      where: { name }
    })

    return productAutomation
  }

  public async createProductAutomation({ 
    name, 
    description, 
    user_id 
  }: ICreateProductAutomationDTO) {
    const productAutomation = await prisma.productAutomation.create({
      data: {
        name,
        description,
        user_id
      }
    })

    return productAutomation
  }

  public async deleteProductAutomation(id: string) {
    const productAutomation = await prisma.productAutomation.delete({
      where: { id }
    })

    return productAutomation
  }
}
