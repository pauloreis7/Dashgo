import { Flex, Button, Text, Icon } from "@chakra-ui/react"
import Link from 'next/link'
import { motion, useViewportScroll, useTransform, useMotionValue } from 'framer-motion'
import { RiUserFollowLine } from 'react-icons/ri'

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

  const introScrollY = useTransform(scrollYProgress, [0, 0.40], [0, 200])
  const introTextScrollY = useTransform(scrollYProgress, [0, 0.40], [160, 30])

  const intro3dRotateX = useTransform(intro3dY, [-100, 100], [30, -30])
  const intro3dRotateY = useTransform(intro3dX, [-100, 100], [-30, 30])

  return (
    <MotionFlex 
      variants={stagger} 
      style={{ perspective: 2000 }}
      w="100%"
      h="100vh"
      p="6rem 3rem"
      bgColor="pink.500"
      position="relative"
      zIndex={0}
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
        }}
      >
        <MotionBox 
          variants={fadeInUpHome} 
          w="66rem" 
          h="100%" 
          position="relative"
          style={{
            cursor: "grab",
            x: intro3dX,
            y: intro3dY,
            rotateX: intro3dRotateX,
            rotateY: intro3dRotateY,
            z: -1000
          }}
          drag
          dragElastic={0.16}
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          whileTap={{ cursor: "grabbing" }}
        >
          <video playsInline autoPlay muted loop>
            <source src="/videos/introweb.webm" type="video/webm" />
            <source src="/videos/yt.mp4" type="video/mp4" />
          </video>
        </MotionBox>
      </motion.div>
    </MotionFlex>
  )
}