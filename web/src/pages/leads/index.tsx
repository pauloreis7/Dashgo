import {
  Flex,
  Heading,
  Box,
  Icon,
  Button,
  Spinner} from '@chakra-ui/react'
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { RiAddLine } from 'react-icons/ri'
import { parseCookies } from 'nookies'
import Head from 'next/head'

import { useLeads } from '../../hooks/useLeads'

import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { LeadsTableList } from '../../components/LeadsTableList'

import { 
  MotionBox, 
  containerListAnimation 
} from '../../components/animations/GlobalAnimations'

export default function UserList() {
  const [ page, setPage ] = useState(1)

  const { data, isLoading, isFetching, error } = useLeads(page)

  return (
    <Box>
      <Head>
        <title>Leads | dashgo</title>
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
        </MotionBox>
      </Flex>
    </Box>
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