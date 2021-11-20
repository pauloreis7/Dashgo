import { Stack, Button, Text, Icon } from "@chakra-ui/react"
import Link from 'next/link'
import { motion, useViewportScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { RiUserFollowLine } from 'react-icons/ri'

import { 
  MotionChakraLink,
  MotionFlex,
  dropList
} from '../animations/GlobalAnimations'

import { 
  fadeInUpHome, 
  footerLinksContainerHome,
} from '../animations/HomepageAnimations'

const socials = ["Instagram", "Facebook", "Youtube", "Twitter", "Linkedin", "Email"]

export function HomeFooter() {
  const { scrollYProgress } = useViewportScroll()

  const { ref, inView } = useInView({
    threshold: 0.8
  })
  
  const footerTextScrollY = useTransform(scrollYProgress, [0.9, 1], [80, 180])
  const footerTextOpacityScrollY = useTransform(scrollYProgress, [0.8, 1], [0, 1])

  return (
    <motion.section
      style={{
        backgroundImage: "url(/images/galaxy.gif)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "50% 60%",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
      layout
      ref={ref}
    >
      <MotionFlex
        w="100%"
        flex="1"
        align="center"
        p="4rem"
        position="relative"
      >
        <motion.div 
          style={{ 
            position: "absolute",
            top: footerTextScrollY,
            opacity: footerTextOpacityScrollY,
            maxWidth: "34rem",
            flex: 1,
            zIndex: 2
          }}
          variants={fadeInUpHome}
        >
          <Text 
            as="h1" 
            fontWeight="medium" 
            fontSize="7xl"
            lineHeight="short"
          >
            Comece agora de graça
          </Text>

          <Text maxW="xl" opacity="0.95" fontSize="md" mb="8">
            Dashgo um universo de possibilidades
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

        { inView && (
          <MotionFlex
            ml="auto"
            fontSize="xl"
            fontWeight="medium"
            variants={footerLinksContainerHome}
          >
            <Stack spacing="6">
              { socials.map((social, i) => (
                <Link href="#" passHref>
                  <MotionChakraLink
                    _hover={{
                      color: "pink.500",
                      transition: "0.2s",
                    }}
                    whileHover={{ x: 10, scale: 1.08 }}
                    variants={dropList}
                    custom={i}
                    key={i}
                  >
                    {social}
                  </MotionChakraLink>
                </Link>
              )) }
            </Stack>
          </MotionFlex>
        ) }
      </MotionFlex>

      <MotionFlex
        as="footer"
        w="100%"
        h="12vh"
        justify="center"
        align="center"
        fontSize="sm"
        color="gray.200"
        opacity="0.9"
      >
        Copyright &copy; Paulo Reis. Todos os direitos reservados.
      </MotionFlex>
    </motion.section>
  )
}