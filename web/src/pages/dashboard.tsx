import { Flex, SimpleGrid } from '@chakra-ui/react'
import { ApexOptions } from 'apexcharts'

import { useLeadsChart } from '../hooks/useLeadsChart'

import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { Chart } from '../components/Chart'

export default function Dashboard() {
  const { data, isLoading, isFetching, error } = useLeadsChart(7)

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px={["4", "6"]}>
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="380px" align="flex-start">

          <Chart
            title="Leads da semana"
            options={data?.options}
            series={data?.series}
            isLoading={isLoading}
            isFetching={isFetching}
            error={error}
          />

          <Chart
            title="Taxa de abertura"
            options={data?.options}
            series={data?.series}
            isLoading={isLoading}
            isFetching={isFetching}
            error={error}
          />
        
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}