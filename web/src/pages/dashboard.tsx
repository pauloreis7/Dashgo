import { Flex, SimpleGrid } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import Head from 'next/head'

import { useLeadsChart } from '../hooks/useLeadsChart'
import { useProductsAutomationsChart } from '../hooks/useProductsAutomationsChart'
import { useCompareChart } from '../hooks/useCompareChart'

import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { Chart } from '../components/Chart'

export default function Dashboard() {
  const { 
    data: leadsData, 
    isLoading: leadsIsLoading, 
    isFetching: leadsIsFetching, 
    error: leadsError
  } = useLeadsChart(7)

  const { 
    data: productsAutomationsData, 
    isLoading: productsAutomationsIsLoading, 
    isFetching: productsAutomationsIsFetching, 
    error: productsAutomationsError
  } = useProductsAutomationsChart(7)

  const { 
    data: compareChartData, 
    isLoading: compareChartIsLoading, 
    isFetching: compareChartIsFetching, 
    error: compareChartError
  } = useCompareChart()

  return (
    <Flex direction="column" h="100vh">
      <Head>
        <title>Dashboard | dashgo</title>
      </Head>

      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px={["4", "6"]}>
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="400px" align="flex-start">

          <Chart
            title="Leads da semana"
            options={leadsData?.options}
            series={leadsData?.series}
            type="area"
            isLoading={leadsIsLoading}
            isFetching={leadsIsFetching}
            error={leadsError}
          />

          <Chart
            title="Taxa de abertura"
            options={leadsData?.options}
            series={leadsData?.series}
            type="area"
            isLoading={leadsIsLoading}
            isFetching={leadsIsFetching}
            error={leadsError}
          />

          <Chart
            title="Leads e Automações de produtos"
            options={compareChartData?.options}
            series={compareChartData?.series}
            type="donut"
            isLoading={compareChartIsLoading}
            isFetching={compareChartIsFetching}
            error={compareChartError}
          />

          <Chart
            title="Automações de produtos criadas"
            options={productsAutomationsData?.options}
            series={productsAutomationsData?.series}
            type="area"
            isLoading={productsAutomationsIsLoading}
            isFetching={productsAutomationsIsFetching}
            error={productsAutomationsError}
          />         
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['@dashgo.token']: token } = parseCookies(ctx)
  
  if(!token) {
    return {
      redirect: {
        destination: '/account/signin',
        permanent: false,
      }
    }
  }

  return {
    props: {},
  }
}