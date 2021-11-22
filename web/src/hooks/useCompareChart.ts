import { theme } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { ApexOptions } from 'apexcharts'

import { api } from '../services/apiClient'

type GetCompareChartResponse = {
  options: ApexOptions, 
  series: number[]
}

export async function getCompareChart(): Promise<GetCompareChartResponse> {
  const { headers: leadsHeaders } = await api.get('/leads')

  const { headers: productsAutomationsheaders } = await api.get('/productsAutomations')

  const options: ApexOptions = {
    labels: ['Leads', 'Automações de produtos'],
    dataLabels: {
      enabled: true,
      textAnchor: 'middle',
      distributed: false,
      offsetX: 0,
      offsetY: 0,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
      },
      background: {
        enabled: false,
        foreColor: theme.colors.gray[700],
        padding: 4,
        borderRadius: 4,
        borderWidth: 1,
        dropShadow: {
          enabled: false,
        }
      },
      dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 1,
        color: '#000',
        opacity: 0.45
      }
    },
    tooltip: {
      enabled: true,
      fillSeriesColor: true,
      theme: 'dark'
    },
    fill: {
      type: 'solid',
      colors: [theme.colors.pink[500], theme.colors.blue[600]],
    },
    stroke: {
      show: false
    },
    colors: [theme.colors.pink[500], theme.colors.blue[600]],
    chart: {
      foreColor: theme.colors.gray[50]
    }
  }

  const series = [
    Number(leadsHeaders['x-total-count']) ,
    Number(productsAutomationsheaders['x-total-count'])
  ]
  
  return { options, series }
}

export function useCompareChart() {
  return useQuery(['compareChart'], () => getCompareChart(), {
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}