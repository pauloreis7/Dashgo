import { Flex, Button, Text, Icon } from "@chakra-ui/react"
import Link from 'next/link'
import { motion, useViewportScroll, useTransform, useMotionValue } from 'framer-motion'
import { RiUserFollowLine } from 'react-icons/ri'

import { 
  MotionBox, 
  stagger
} from '../animations/GlobalAnimations'
import { fadeInUpHome } from '../animations/HomepageAnimations'

export function IntroBanner() {
  const { scrollYProgress } = useViewportScroll()
  const intro3dX = useMotionValue(0)
  const intro3dY = useMotionValue(0)

  const introScrollY = useTransform(scrollYProgress, [0, 0.40], [0, 48])
  const introTextScrollY = useTransform(scrollYProgress, [0, 0.40], [80, 10])

  const intro3dRotateX = useTransform(intro3dY, [-100, 100], [30, -30])
  const intro3dRotateY = useTransform(intro3dX, [-100, 100], [-30, 30])

  return (
    <MotionBox variants={stagger} style={{ perspective: 2000 }}>
      <Flex
        p="6rem 3rem 3rem"
        justify="space-between"
        bgColor="gray.800"
      >
        <MotionBox variants={fadeInUpHome} flex="1" position="relative">
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

        <MotionBox 
          variants={fadeInUpHome} 
          w="37.5rem" 
          h="25.75rem" 
          position="relative"
          style={{
            cursor: "grab",
            x: intro3dX,
            y: intro3dY,
            rotateX: intro3dRotateX,
            rotateY: intro3dRotateY,
            z: 100
          }}
          drag
          dragElastic={0.16}
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: "url(/images/intro.gif)",
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              position: "absolute",
              top: introScrollY,
            }}
          />
        </MotionBox>
      </Flex>
    </MotionBox>
  )
}