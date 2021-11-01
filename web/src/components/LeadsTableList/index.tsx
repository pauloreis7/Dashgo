import {
  Flex,
  SkeletonText,
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useBreakpointValue
} from '@chakra-ui/react'

import { Pagination } from '../Pagination'
import { DeleteButton } from './DeleteButton'
import { UpdateButton } from './UpdateButton'

type Lead = {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

interface LeadsListProps {
  leads?: Lead[]
  totalCount?: number,
  isLoading: boolean;
  isFetching: boolean;
  error: any;
  page: number;
  setPage: (page: number) => void;
}

export function LeadsTableList({ 
  leads,
  totalCount,
  isLoading,
  error,
  page, 
  setPage
}: LeadsListProps) {
  const isMediumVersion = useBreakpointValue({
    base: false,
    md: true
  })

  return (
    <>
      <SkeletonText
        isLoaded={!isLoading}
        borderRadius="xl"
        startColor="gray.700"
        endColor="gray.600"
        spacing="6"
        noOfLines={8}
      >
        { error ? (
          <Flex justify="center">
            <Text>Falha ao obter dados dos leads :/</Text>
          </Flex>
        ) : !isLoading && (
          <>
            <Table overflowX="scroll" colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th width="8"></Th>
                  <Th>Lead</Th>
                  { isMediumVersion && <Th>Data de cadastro</Th> }
                  <Th px={["4", "4", "6"]} color="gray.300" width="8">
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {leads.map(lead => {
                  return (
                    <Tr key={lead.id}>
                      <Td>
                        <UpdateButton
                          leadId={lead.id}
                          title="Editar lead"
                          initialName={lead.name}
                          initialEmail={lead.email}
                        />
                      </Td>
                      <Td>
                        <Box>
                          <Text color="pink.500" fontWeight="bold">{lead.name}</Text>
                          <Text fontSize="sm" color="gray.300">{lead.email}</Text>
                        </Box>
                      </Td>
                      { isMediumVersion && <Td>{lead.created_at}</Td> }
                      <Td px={["4", "4", "6"]}>
                        <DeleteButton
                          leadId={lead.id}
                          title="Deseja deletar o lead?"
                        />
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
            
            <Pagination
              totalCountOfRegisters={totalCount}
              currentPage={page}
              onPageChange={setPage}
            />
          </>
        )}
      </SkeletonText>
    </>
  )
}