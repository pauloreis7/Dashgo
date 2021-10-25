import { Flex, Heading, SimpleGrid, Box, Text, Skeleton, Spinner } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

import { useAuth } from '../contexts/AuthContext'
import { useApexOptions } from '../hooks/useApexOptions'

import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

const series = [
  { name: 'subs', data: [120, 56, 123, 290, 84, 138, 109] }
]

export default function Dashboard() {
  const { user } = useAuth()
  const { data, isLoading, isFetching, error } = useApexOptions(7)

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

            <Skeleton isLoaded={!isLoading} height="10rem" 
              startColor="gray.700" endColor="gray.900"
            >
              { error ? (
                <Flex justify="center">
                  <Text>Falha ao obter dados da Dashboard</Text>
                </Flex>
                ) : !isLoading && (
                <Chart options={data.options} series={series} type="area" height={160} />
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

            <Skeleton isLoaded={!isLoading} height="10rem" 
              startColor="gray.700" endColor="gray.900"
            >
              { error ? (
                <Flex justify="center">
                  <Text>Falha ao obter dados da Dashboard</Text>
                </Flex>
                ) : !isLoading && (
                <Chart options={data.options} series={series} type="area" height={160} />
              )}
            </Skeleton>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}