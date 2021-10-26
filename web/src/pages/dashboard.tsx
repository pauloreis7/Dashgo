import { Flex, Heading, SimpleGrid, Box, Text, Skeleton, Spinner } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

import { useLeadsChart } from '../hooks/useLeadsChart'

import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

export default function Dashboard() {
  const { data, isLoading, isFetching, error } = useLeadsChart(7)

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px={["4", "6"]}>
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="380px" align="flex-start">
          <Box
            p={["4", "6"]}
            pb="4"
            bg="gray.800"
            borderRadius={8}
          >
            <Heading fontSize="lg" mb="4">
              Leads da semana

              { isLoading || isFetching && <Spinner size="sm" color="gray.500" ml="4" /> }
            </Heading>

            <Skeleton 
              isLoaded={!isLoading} 
              height="10rem"
              borderRadius="2xl"
              startColor="gray.700" 
              endColor="gray.600"
            >
              { error ? (
                <Flex justify="center">
                  <Text>Falha ao obter dados da Dashboard :(</Text>
                </Flex>
                ) : !isLoading && (
                <Chart options={data.options} series={data.series} type="area" height={160} />
              )}
            </Skeleton>
          </Box>

          <Box
            p={["4", "6"]}
            pb="4"
            bg="gray.800"
            borderRadius={8}
          >
            <Heading fontSize="lg" mb="4">
              Taxa de abertura

              { isLoading || isFetching && <Spinner size="sm" color="gray.500" ml="4" /> }
            </Heading>

            <Skeleton 
              isLoaded={!isLoading} 
              height="10rem"
              borderRadius="2xl"
              startColor="gray.700" 
              endColor="gray.600"
            >
              { error ? (
                <Flex justify="center">
                  <Text>Falha ao obter dados da Dashboard :(</Text>
                </Flex>
                ) : !isLoading && (
                <Chart options={data.options} series={data.series} type="area" height={160} />
              )}
            </Skeleton>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}