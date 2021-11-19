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

type ProductAutomation = {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

interface ProductsAutomationsProps {
  productsAutomations?: ProductAutomation[]
  totalCount?: number,
  isLoading: boolean;
  isFetching: boolean;
  error: any;
  page: number;
  setPage: (page: number) => void;
}

export function ProductsAutomationsTable({ 
  productsAutomations,
  totalCount,
  isLoading,
  error,
  page, 
  setPage
}: ProductsAutomationsProps) {
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
            <Text>Falha ao obter dados das automações de produtos :/</Text>
          </Flex>
        ) : !isLoading && (
          <>
            <Table overflowX="scroll" colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th width="8">Automação de produto</Th>
                  <Th>descrição</Th>
                  { isMediumVersion && <Th textAlign="center">Data de criação</Th> }
                  <Th px={["4", "4", "6"]} color="gray.300" width="8" />
                </Tr>
              </Thead>

              <Tbody>
                {productsAutomations.map(productAutomation => {
                  return (
                    <Tr key={productAutomation.id}>
                      <Td>
                        <Text color="pink.500" fontWeight="bold">
                          {productAutomation.name}
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize="sm" color="gray.300">
                          {productAutomation.description}
                        </Text>
                      </Td>
                      { isMediumVersion && <Td>{productAutomation.created_at}</Td> }
                      <Td px={["4", "4", "6"]}>
                        <DeleteButton
                          productAutomationId={productAutomation.id}
                          title={`Deseja deletar a automação ${productAutomation.name}`}
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