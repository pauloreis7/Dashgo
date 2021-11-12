import { Stack, Button, Text, Icon } from "@chakra-ui/react"
import Link from 'next/link'
import { motion, useViewportScroll, useTransform, useMotionValue } from 'framer-motion'
import { RiUserFollowLine, RiArrowDownSLine } from 'react-icons/ri'

import { 
  MotionBox,
  MotionFlex,
  stagger
} from '../animations/GlobalAnimations'
import { fadeInUpHome } from '../animations/HomepageAnimations'

export function IntroBanner() {
  const { scrollYProgress } = useViewportScroll()
  const intro3dX = useMotionValue(0)
  const intro3dY = useMotionValue(0)

  const introScrollY = useTransform(scrollYProgress, [0, 0.47], [0, 180])
  const introTextScrollY = useTransform(scrollYProgress, [0, 0.40], [160, 30])

  const intro3dRotateX = useTransform(intro3dY, [-100, 100], [30, -30])
  const intro3dRotateY = useTransform(intro3dX, [-100, 100], [-30, 30])

  return (
    <MotionFlex
      layout
      variants={stagger} 
      style={{ perspective: 2000 }}
      bgImage="url(/images/background.png)"
      bgRepeat="no-repeat"
      bgSize="cover"
      w="100%"
      h="100vh"
      p="6rem 3rem"
      position="relative"
    >
      <MotionBox 
        variants={fadeInUpHome} 
        maxW="40rem" 
        flex="1" 
        position="relative"
        zIndex={2}
      >
        <motion.div
          style={{ 
            position: "absolute",
            top: introTextScrollY,
          }}
        >
          <Text as="h1" mb="5" color="gray.100" fontSize="5xl" fontWeight="bold" lineHeight="3.8rem">
            Descubra a plataforma para gestão das top empresas
          </Text>

          <Text maxW="xl" fontSize="lg" mb="6">
            Dashgo é a agilidade e precisão nos seus dados cumprindo totalmente o papel estratégico e utilizada pelos melhores profissionais
          </Text>

          <Link href="/account/signup" passHref>
            <Button 
              as="a"
              size="lg"
              colorScheme="pink"
              cursor="pointer"
              rightIcon={<Icon as={RiUserFollowLine} fontSize="20" />}
            >
              Criar conta
            </Button>
          </Link>
        </motion.div>
      </MotionBox>

      <motion.div
        style={{
          position: "absolute",
          right: "0",
          top: introScrollY,
          zIndex: 0
        }}
      >
        <MotionBox 
          variants={fadeInUpHome} 
          w="100%" 
          h="100%" 
          style={{
            cursor: "grab",
            x: intro3dX,
            y: intro3dY,
            rotateX: intro3dRotateX,
            rotateY: intro3dRotateY,
            z: -1000
          }}
          drag
          dragElastic={{ top: 0.16, right: 0.0001, bottom: 0.16, left: 0.16 }}
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          whileTap={{ cursor: "grabbing" }}
        >
          <video playsInline autoPlay muted loop >
            <source src="/videos/introweb.webm" type="video/webm" />
            <source src="/videos/intro.mp4" type="video/mp4" />
          </video>
        </MotionBox>
      </motion.div>

      <MotionFlex
        position="absolute"
        bottom="8"
        right="8"
      >
        <Stack spacing="0.1rem">
          <Icon as={RiArrowDownSLine} fontSize="26" />
          <Icon as={RiArrowDownSLine} fontSize="26" />
          <Icon as={RiArrowDownSLine} fontSize="26" />
        </Stack>
      </MotionFlex>
    </MotionFlex>
  )
}