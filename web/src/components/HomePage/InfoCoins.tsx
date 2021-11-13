import { Flex, Box, Text } from "@chakra-ui/react"
import { motion, useViewportScroll, useTransform } from 'framer-motion'

import { MotionBox, MotionStack, MotionText } from '../animations/GlobalAnimations'
import { coinsHome } from '../animations/HomepageAnimations'

export function InfoCoins() {
  const { scrollYProgress } = useViewportScroll()

  const coinsScrollY = useTransform(scrollYProgress, [0.20, 0.30], [0, 1])
  const coinsMainTextScrollYScale = useTransform(scrollYProgress, [0.15, 0.20], [0, 1])

  return (
    <Flex
      w="100%" 
      minH="120vh"
      p="8rem 0 2rem"
      flexDirection="column"
      justify="center"
      align="center" 
      backgroundColor="gray.950"
      position="relative"
      style={{ perspective: 2000 }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          padding: "0 5rem",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridColumnGap: "50%",
          position: "absolute",
          zIndex: 0,
          scale: coinsScrollY
        }}
      >
        <Flex position="relative">
          <MotionBox
            maxW="9.40rem"
            w="50%"
            zIndex={2}
            drag
            dragElastic={0.05}
            dragConstraints={{ left: 0, top: 60, right: 120, bottom: 140 }}
            cursor="grab"
            style={{
              z: 1000
            }}
            whileTap={{ cursor: "grabbing"}}
            variants={coinsHome}
          >
            <video playsInline autoPlay muted loop >
              <source src="/videos/coinweb.webm" type="video/webm" />
              <source src="/videos/coin.mp4" type="video/mp4" />
            </video>
          </MotionBox>
        </Flex>

        <Flex position="relative">
          <MotionBox
            maxW="11.5rem"
            w="58%"
            zIndex={2}
            drag
            dragElastic={0.05}
            dragConstraints={{ left: 0, top: 10, right: 120, bottom: 140 }}
            cursor="grab"
            style={{
              z: 1000
            }}
            whileTap={{ cursor: "grabbing", scale: 0.95 }}
            variants={coinsHome}
          >
            <video playsInline autoPlay muted loop >
              <source src="/videos/coinweb.webm" type="video/webm" />
              <source src="/videos/coin.mp4" type="video/mp4" />
            </video>
          </MotionBox>
        </Flex>

        <Flex position="relative">
          <MotionBox
            maxW="8rem"
            w="35%"
            position="absolute"
            left="40"
            zIndex={2}
            drag
            dragElastic={0.05}
            dragConstraints={{ left: 0, top: -80, right: 320, bottom: 0 }}
            cursor="grab"
            style={{
              z: 1000
            }}
            whileTap={{ cursor: "grabbing", scale: 0.95 }}
            variants={coinsHome}
          >
            <video playsInline autoPlay muted loop >
              <source src="/videos/coinweb.webm" type="video/webm" />
              <source src="/videos/coin.mp4" type="video/mp4" />
            </video>
          </MotionBox>
        </Flex>
      </motion.div>
      
      <motion.div
        style={{
          maxWidth: "37.5rem",
          textAlign: "center",
          zIndex: 2,
          scale: coinsMainTextScrollYScale
        }}
      >
        <MotionText 
          as="h1"
          fontSize="8rem"
          lineHeight="8rem"
          fontWeight="semibold"
          color="gray.50"
          variants={coinsHome}
        >
          Gerencie suas métricas
        </MotionText>
        <Text
          fontWeight="medium"
          maxW={400}
          m="1rem auto 0"
          color="pink.500"
        >
          Controle seus dados em poucos minutos. <br />
          Use as funções especiais da plataforma para análise
        </Text>
      </motion.div>

      <MotionStack
        spacing="8"
        direction="row"
        m="7rem 0 0"
        textAlign="left"
        fontSize="sm"
        fontWeight="medium"
      >
        <Box maxW="16.25rem">
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

        <Box maxW="16.25rem">
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

        <Box maxW="16.25rem">
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

        <Box maxW="16.25rem">
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