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
import Head from 'next/head'

import { useProductsAutomations } from '../../hooks/useProductsAutomations'

import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { ProductsAutomationsTable } from '../../components/ProductsAutomationsTable'

import { 
  MotionBox, 
  containerListAnimation 
} from '../../components/animations/GlobalAnimations'

export default function productsAutomations() {
  const [ page, setPage ] = useState(1)

  const { data, isLoading, isFetching, error } = useProductsAutomations(page)

  return (
    <Box>
      <Head>
        <title>Automações de produtos | dashgo</title>
      </Head>

      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <MotionBox 
          flex="1" 
          borderRadius={8} 
          bg="gray.800" 
          p="8" 
          overflowX="auto"
          variants={containerListAnimation}
          initial="initial"
          animate="animate"
          exit={{ opacity: 0 }}
        >
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Automações de produtos

              { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" /> }
            </Heading>

            <Link href="/productsAutomations/create" passHref>
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

          <ProductsAutomationsTable 
            productsAutomations={data?.productsAutomations}
            totalCount={data?.totalCount}
            isLoading={isLoading}
            isFetching={isFetching}
            error={error}
            page={page}
            setPage={setPage}
          />
        </MotionBox>
      </Flex>
    </Box>
  )
}