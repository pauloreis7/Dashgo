import { theme } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { ApexOptions } from 'apexcharts'
import dayjs from 'dayjs'

export function getApexOptions(dayChartCategoriesCount: number) {
  const defaultArray = Array.from(Array(dayChartCategoriesCount))

  const optionsCategories = defaultArray.map((_ , index) => {
    const date = dayjs().subtract(index, 'day')

    const formattedDate = dayjs(date).format('YYYY-MM-DDTHH[:00:00.000Z]')

    return formattedDate
  }).reverse()
  
  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      foreColor: theme.colors.gray[500]
    },
    grid: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      enabled: false
    },
    xaxis: {
      type: 'datetime',
      axisBorder: {
        color: theme.colors.gray[600]
      },
      axisTicks: {
        color: theme.colors.gray[600]
      },
      categories: optionsCategories
    },
    fill: {
      opacity: 0.3,
      type: 'gradient',
      gradient: {
        shade: 'dark',
        opacityFrom: 0.7,
        opacityTo: 0.3
      }
    }
  }

  return { options }
}

export function useApexOptions(dayChartCategoriesCount: number) {
  return useQuery(['apexOptions', dayChartCategoriesCount], 
  () => getApexOptions(dayChartCategoriesCount), {
    staleTime: 1000 * 60 * 60 * 3, // 3 hours
  })
}