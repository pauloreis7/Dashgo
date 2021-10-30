import { useQuery } from 'react-query'

import { api } from '../services/apiClient'

type Lead = {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

type GetLeadsResponse = {
  totalCount: number,
  leads: Lead[],
}

export async function getLeads(page: number): Promise<GetLeadsResponse> {
  const { data, headers } = await api.get('/leads', {
    params: {
      page
    }
  })

  const totalCount = Number(headers['x-total-count'])

  const leads = data.map(lead => {
    return {
      id: lead.id,
      name: lead.name,
      email: lead.email,
      created_at: new Date(lead.created_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
    }
  })
  
  return {
    leads,
    totalCount
  }
}

export function useLeads(page: number) {
  return useQuery(['leads', page], () => getLeads(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}