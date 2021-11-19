import { useQuery } from 'react-query'

import { api } from '../services/apiClient'

type ProductAutomation = {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

type GetProductsAutomationsResponse = {
  totalCount: number,
  productsAutomations: ProductAutomation[],
}

export async function getProductsAutomations(page: number)
  : Promise<GetProductsAutomationsResponse> {
  const { data, headers } = await api.get('/productsAutomations', {
    params: {
      page
    }
  })

  const totalCount = Number(headers['x-total-count'])

  const productsAutomations = data.map(productAutomation => {
    return {
      id: productAutomation.id,
      name: productAutomation.name,
      description: productAutomation.description,
      created_at: new Date(productAutomation.created_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
    }
  })
  
  return {
    productsAutomations,
    totalCount
  }
}

export function useProductsAutomations(page: number) {
  return useQuery(['productsAutomations', page], () => getProductsAutomations(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}