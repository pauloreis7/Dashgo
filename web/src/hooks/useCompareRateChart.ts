import { theme } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { ApexOptions } from 'apexcharts'

import { api } from '../services/apiClient'

type GetCompareRateChartResponse = {
  options: ApexOptions, 
  series: {
    name: string;
    data: number[]
  }[]
}

export async function getCompareRateChart(daysToChartCount: number)
  : Promise<GetCompareRateChartResponse> {
  const { headers: leadsHeaders } = await api.get('/leads')

  const { headers: productsAutomationsheaders } = await api.get('/productsAutomations')

  const { data: leadsData } = await api.get('/leads/daysCount', {
    params: {
      daysAgo: daysToChartCount
    }
  })

  const { data: productsAutomationsData } = 
  await api.get('/productsAutomations/daysCount', {
    params: {
      daysAgo: daysToChartCount
    }
  })

  const leadsFormatted = leadsData.reduce(
    (accumulator: number, item: number) => accumulator + item , 0
  )

  const productsAutomationsFormatted = productsAutomationsData.reduce(
    (accumulator: number, item: number) => accumulator + item , 0
  )

  const options: ApexOptions = {
    xaxis: {
      categories: ['Leads', 'Automações', 'Leads da semana', 'Automações da semana']
    },
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
        enabled: true,
        borderRadius: 4,
        borderWidth: 0,
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
      theme: 'dark',
      
    },
    fill: {
      opacity: 0.6,
      colors: [theme.colors.pink[500]],
    },
    stroke: {
      show: true,
      width: 4,
      colors: [theme.colors.pink[700]],
      dashArray: 0
    },
    markers: {
      size: 8,
      strokeColors: theme.colors.pink[700],
      hover: {
        size: 10
      },
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: theme.colors.gray[600]
        }
      }
    },
    colors: [theme.colors.pink[500]],
  
    chart: {
      foreColor: theme.colors.gray[50],
    }
  }

  const series = [{
    name: 'Quantidade',
    data: [
      Number(leadsHeaders['x-total-count']),
      Number(productsAutomationsheaders['x-total-count']),
      leadsFormatted,
      productsAutomationsFormatted
    ],
  }]
  
  return { 
    options,
    series
  }
}

export function useCompareRateChart(daysToChartCount: number) {
  return useQuery(['compareRateChart', daysToChartCount], 
  () => getCompareRateChart(daysToChartCount), {
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}