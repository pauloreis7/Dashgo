import { Stack, Button, Text, Icon, Link as ChakraLink } from "@chakra-ui/react"
import Link from 'next/link'
import { motion, useViewportScroll, useTransform } from 'framer-motion'
import { RiUserFollowLine } from 'react-icons/ri'

import { 
  MotionBox,
  MotionFlex,
  stagger
} from '../animations/GlobalAnimations'
import { fadeInUpHome } from '../animations/HomepageAnimations'

export function HomeFooter() {
  const { scrollYProgress } = useViewportScroll()

  const introTextScrollY = useTransform(scrollYProgress, [0, 0.40], [160, 30])

  return (
    <MotionFlex
      as="section"
      layout
      bgImage="url(/images/galaxy.gif)"
      bgPosition="50% 50%"
      bgRepeat="no-repeat"
      bgSize="cover"
      w="100%"
      h="100vh"
      flexDirection="column"
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
            top: introTextScrollY,
            maxWidth: "34rem",
            flex: 1,
            zIndex: 2
          }}
          variants={fadeInUpHome}
        >
          <Text 
            as="h1" 
            mb="8"
            fontWeight="medium" 
            fontSize="7xl"
            lineHeight="short"
          >
            Comece agora de graça
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

        <MotionFlex
          ml="auto"
          fontSize="xl"
          fontWeight="medium"
        >
          <Stack spacing="6">
            <Link href="/account/signin" passHref>
              <ChakraLink
                _hover={{
                  color: "pink.500",
                  transition: "0.2s",
                }}
              >
                Instagram
              </ChakraLink>
            </Link>
            <Link href="/account/signin" passHref>
              <ChakraLink
                _hover={{
                  color: "pink.500",
                  transition: "0.2s",
                }}
              >
                Facebook
              </ChakraLink>
            </Link>
            <Link href="/account/signin" passHref>
              <ChakraLink
                _hover={{
                  color: "pink.500",
                  transition: "0.2s",
                }}
              >
                Youtube
              </ChakraLink>
            </Link>
            <Link href="/account/signin" passHref>
              <ChakraLink
                _hover={{
                  color: "pink.500",
                  transition: "0.2s",
                }}
              >
                Twitter
              </ChakraLink>
            </Link>
            <Link href="/account/signin" passHref>
              <ChakraLink
                _hover={{
                  color: "pink.500",
                  transition: "0.2s",
                }}
              >
                Linkedin
              </ChakraLink>
            </Link>
            <Link href="/account/signin" passHref>
              <ChakraLink
                _hover={{
                  color: "pink.500",
                  transition: "0.2s",
                }}
              >
                Email
              </ChakraLink>
            </Link>
          </Stack>
        </MotionFlex>
      </MotionFlex>

      <MotionFlex
        as="footer"
        w="100%"
        h="12vh"
        justify="center"
        align="center"
        fontSize="sm"
        color="gray.200"
        opacity="0.8"
      >
        Copyright &copy; Paulo Reis. Todos os direitos reservados.
      </MotionFlex>
    </MotionFlex>
  )
}