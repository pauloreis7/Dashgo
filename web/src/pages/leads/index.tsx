import {
  Flex,
  Heading,
  Box,
  Text,
  Icon,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Spinner,
  useBreakpointValue
} from '@chakra-ui/react'
import { useState } from 'react'
import Link from 'next/link'
import { RiAddLine, RiPencilLine } from 'react-icons/ri'

import { useLeads } from '../../hooks/useLeads'

import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { Pagination } from '../../components/Pagination'

export default function UserList() {
  const [ page, setPage ] = useState(1)

  const { data, isLoading, isFetching, error } = useLeads(page)

  const isMediumVersion = useBreakpointValue({
    base: false,
    md: true
  })

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

            <Link href="/lead/create" passHref>
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

          { isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos leads :/</Text>
            </Flex>
          ) : (
            <>
              <Table overflowX="scroll" colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Lead</Th>
                    { isMediumVersion && <Th>Data de cadastro</Th> }
                    <Th width="8"></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {data.leads.map(lead => {
                    return (
                      <Tr key={lead.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Text color="pink.500" fontWeight="bold">{lead.name}</Text>
                            <Text fontSize="sm" color="gray.300">{lead.email}</Text>
                          </Box>
                        </Td>
                        { isMediumVersion && <Td>{lead.created_at}</Td> }
                        <Td>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="purple"
                            leftIcon={<Icon as={RiPencilLine} fontSize="18" />}
                            cursor="pointer"
                          >
                            Editar
                          </Button>
                        </Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
              
              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}