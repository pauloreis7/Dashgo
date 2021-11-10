import { useEffect } from "react"
import { GetStaticProps } from "next"
import { Flex, Box, Text } from "@chakra-ui/react"
import Router from 'next/router'
import Image from 'next/image'
import { parseCookies } from 'nookies'

import { HomeHeader } from '../components/HomePage/HomeHeader'
import { IntroBanner } from '../components/HomePage/IntroBanner'

import { MotionBox, MotionStack } from '../components/animations/GlobalAnimations'

export default function HomePage() {
  useEffect(() => {
    const { ['@dashgo.token']: token } = parseCookies()

    if(token) {
      Router.push('/dashboard')
    }
  }, [])

  return (
    <MotionBox initial='initial' animate='animate' exit={{ opacity: 0 }}>
      <HomeHeader />

      <IntroBanner />

      <Flex 
        h="160vh" 
        p="4" 
        justify="center" 
        backgroundColor="black"
        position="relative"
        zIndex={2}
      >
        <MotionBox>
          <Image src="/images/coin.gif" width={60} height="60" />
          <Image src="/images/coin.gif" width={60} height="60" />
          <Image src="/images/coin.gif" width={60} height="60" />
        </MotionBox>

        <MotionBox w="100%" textAlign="center">
          <Text as="h1">Gerencie suas métricas</Text>
          <Text>
            Controle todos os seus dados em poucos minutos.
            Use as funções especiais de nossa plataforma para análise
          </Text>
        </MotionBox>

        <MotionStack spacing="2">
          <Box>
            <Text as="h3">Gerencie métricas</Text>
            <Text>Manipule todos os seus dados de forma simples e com agilidade</Text>
          </Box>

          <Box>
            <Text as="h3">Layout agradável</Text>
            <Text>Experiência de uso única no uso da plataforma, com uma interface simples e agradável</Text>
          </Box>

          <Box>
            <Text as="h3">Segurança dos dados</Text>
            <Text>Garantia total na segurança em todas as operações realizadas na Dashgo</Text>
          </Box>

          <Box>
            <Text as="h3">Informações em tempo real</Text>
            <Text>Todas as operações e métricas são atualizadas simultâneamente em tempo real durante todo seu uso</Text>
          </Box>
        </MotionStack>
      </Flex>
    </MotionBox>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
