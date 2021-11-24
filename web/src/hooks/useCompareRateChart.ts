import { theme } from '@chakra-ui/react'
import { ApexOptions } from 'apexcharts'

import { useLeads } from './useLeads'
import { useProductsAutomations } from './useProductsAutomations'
import { useLeadsChart } from './useLeadsChart'
import { useProductsAutomationsChart } from './useProductsAutomationsChart'

type GetCompareRateChartResponse = {
  data: {
    options: ApexOptions, 
    series: {
      name: string;
      data: number[]
    }[],
  }
  isLoading: boolean,
  isFetching: boolean,
}

export function useCompareRateChart(daysToChartCount: number)
  : GetCompareRateChartResponse {

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

  const { 
    data: leadsChartData,
    isLoading: leadsChartIsLoading,
    isFetching: leadsChartIsFetching,
  } = useLeadsChart(daysToChartCount)

  const { 
    data: productsAutomationsChartData,
    isLoading: productsAutomationsChartIsLoading,
    isFetching: productsAutomationsChartIsFetching,
  } = useProductsAutomationsChart(daysToChartCount)

  const leadsFormatted = leadsChartData?.series[0].data.reduce(
    (accumulator: number, item: number) => accumulator + item , 0
  )

  const productsAutomationsFormatted = productsAutomationsChartData
  ?.series[0].data.reduce(
    (accumulator: number, item: number) => accumulator + item , 0
  )

  const isLoading = [
    leadsIsLoading,
    productsAutomationsIsLoading,
    leadsChartIsLoading,
    productsAutomationsChartIsLoading
  ].some(itemLoading => itemLoading)

  const isFetching = [
    leadsIsFetching,
    productsAutomationsIsFetching,
    leadsChartIsFetching,
    productsAutomationsChartIsFetching
  ].some(itemFetching => itemFetching)

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
        },
        size: 70,
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
      leadsData?.totalCount,
      productsAutomationsData?.totalCount,
      leadsFormatted,
      productsAutomationsFormatted
    ],
  }]
  
  return { 
    data: {
      options,
      series,
    },
    isLoading,
    isFetching
  }
}