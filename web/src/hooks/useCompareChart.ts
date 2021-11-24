import { theme } from '@chakra-ui/react'
import { ApexOptions } from 'apexcharts'

import { useLeads } from './useLeads'
import { useProductsAutomations } from './useProductsAutomations'

type GetCompareChartResponse = {
  data: {
    options: ApexOptions, 
    series: number[],
  }
  isLoading: boolean,
  isFetching: boolean,
}

export function useCompareChart(): GetCompareChartResponse {

  const { 
    data: leadsData,
    isLoading: leadsIsLoading,
    isFetching: leadsIsFetching,
   } = useLeads(1)

  const { 
    data: productsAutomationsData, 
    isLoading: productsAutomationsIsLoading,
    isFetching: productsAutomationsIsFetching,
  } = useProductsAutomations(1)

  
  const isLoading = [
    leadsIsLoading,
    productsAutomationsIsLoading
  ].some(itemLoading => itemLoading)

  const isFetching = [
    leadsIsFetching,
    productsAutomationsIsFetching
  ].some(itemFetching => itemFetching)


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
    leadsData?.totalCount,
    productsAutomationsData?.totalCount,
  ]
  
  return { 
    data: {
      options, 
      series,
    },
    isLoading,
    isFetching
  }
}
