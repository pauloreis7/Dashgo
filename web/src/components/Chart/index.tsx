import { Flex, Heading, Box, Text, Skeleton, Spinner } from '@chakra-ui/react'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'

const ApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false
  }
) 

interface ChartProps {
  title: string;
  options?: ApexOptions;
  series?: {
    name: string;
    data: number[]
  }[];
  isLoading: boolean;
  isFetching: boolean;
  error: any;
}

export function Chart({ 
  title,
  options,
  series,
  isLoading,
  isFetching,
  error
}: ChartProps) {
  return (
    <Box
      p={["4", "6"]}
      pb="4"
      bg="gray.800"
      borderRadius={8}
    >
      <Heading fontSize="lg" mb="4">
        {title}

        { isLoading || isFetching && <Spinner size="sm" color="gray.500" ml="4" /> }
      </Heading>

      <Skeleton 
        isLoaded={!isLoading}
        height="10rem"
        borderRadius="xl"
        startColor="gray.700"
        endColor="gray.600"
      >
        { error ? (
          <Flex justify="center">
            <Text>Falha ao obter dados da Dashboard  :/</Text>
          </Flex>
          ) : !isLoading && (
          <ApexChart options={options} series={series} type="area" height={160} />
        )}
      </Skeleton>
    </Box>
  )
}