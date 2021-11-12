import { Flex, Box, Text } from "@chakra-ui/react"
import Image from 'next/image'

import { MotionBox, MotionStack } from '../animations/GlobalAnimations'

export function InfoCoins() {
  return (
    <Flex 
      padding="11vw 0 7vw"
      flexDirection="column"
      justify="center"
      align="center" 
      backgroundColor="gray.950"
      position="relative"
      zIndex={2}
    >
      <MotionBox
        position="absolute"
        left="0"
        top="0"
      >
        <Image src="/images/coin.gif" width={60} height="60" />
        <Image src="/images/coin.gif" width={60} height="60" />
        <Image src="/images/coin.gif" width={60} height="60" />
      </MotionBox>

      <MotionBox
        maxW={600}
        textAlign="center"
      >
        <Text 
          as="h1"
          fontSize="8.6vw"
          lineHeight="8rem"
          fontWeight="semibold"
          color="gray.50"
        >
          Gerencie suas métricas
        </Text>
        <Text
          fontWeight="medium"
          maxW={400}
          m="1rem auto 0"
        >
          Controle seus dados em poucos minutos. <br />
          Use as funções especiais da plataforma para análise
        </Text>
      </MotionBox>

      <MotionStack
        spacing="8"
        direction="row"
        m="7rem 0 2rem"
        textAlign="left"
        fontSize="sm"
        fontWeight="medium"
      >
        <Box
          maxW={260}
        >
          <Text 
            as="h3"
            color="pink.500"
            fontSize="xl"
            fontWeight="semibold"
            mb="4"
          >
            Gerencie métricas
          </Text>
          <Text>Manipule todos os seus dados de forma simples e com agilidade</Text>
        </Box>

        <Box
          maxW={260}
        >
          <Text 
            as="h3"
            color="pink.500"
            fontSize="xl"
            fontWeight="semibold"
            mb="4"
          >
            Layout agradável
          </Text>
          <Text>Experiência de uso única da plataforma com interface simples e agradável</Text>
        </Box>

        <Box
          maxW={260}
        >
          <Text 
            as="h3"
            color="pink.500"
            fontSize="xl"
            fontWeight="semibold"
            mb="4"
          >
            Segurança dos dados
          </Text>
          <Text>Garantia total na segurança em todas as operações realizadas na Dashgo</Text>
        </Box>

        <Box
          maxW={260}
        >
          <Text 
            as="h3"
            color="pink.500"
            fontSize="xl"
            fontWeight="semibold"
            mb="4"
          >
            Informações em tempo real
          </Text>
          <Text>Tudo é atualizadas simultâneamente em tempo real durante todo seu uso</Text>
        </Box>
      </MotionStack>
    </Flex>
  )
}