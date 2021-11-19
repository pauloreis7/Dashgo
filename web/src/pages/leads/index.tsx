import {
  Flex,
  Heading,
  Box,
  Icon,
  Button,
  Spinner} from '@chakra-ui/react'
import { useState } from 'react'
import Link from 'next/link'
import { RiAddLine } from 'react-icons/ri'

import { useLeads } from '../../hooks/useLeads'

import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { LeadsTableList } from '../../components/LeadsTableList'

export default function UserList() {
  const [ page, setPage ] = useState(1)

  const { data, isLoading, isFetching, error } = useLeads(page)

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8" overflowX="auto">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Leads

              { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" /> }
            </Heading>

            <Link href="/leads/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                cursor="pointer"
              >
                Criar novo
              </Button>
            </Link>
          </Flex>

          <LeadsTableList 
            leads={data?.leads}
            totalCount={data?.totalCount}
            isLoading={isLoading}
            isFetching={isFetching}
            error={error}
            page={page}
            setPage={setPage}
          />
        </Box>
      </Flex>
    </Box>
  )
}