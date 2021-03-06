import { Flex, HStack, Button } from "@chakra-ui/react"
import Link from 'next/link'

import { Logo } from '../Header/Logo'

import { MotionFlex } from '../animations/GlobalAnimations'
import { fadeInDownHeaderHome } from '../animations/HomepageAnimations'

export function HomeHeader() {
  return (
    <MotionFlex
      as="header"
      position="fixed"
      w="100%"
      h="5rem"
      px="6"
      align="center"
      backgroundColor="transparent"
      zIndex="9999"
      initial="initial"
      animate="animate"
      variants={fadeInDownHeaderHome}
    >
      <Logo />

      <Flex ml="auto" align="center">
        <HStack spacing={["4", "4", "6"]}>
          <Link href="/account/signin" passHref>
            <Button 
              fontSize={{ sm: "0.9rem", md: "1rem" }} 
              p={{ sm: "3", md: "4" }} 
              as="a" colorScheme="pink"
            >
              Login
            </Button>
          </Link>

          <Link href="/account/signup" passHref>
            <Button 
              as="a"
              fontSize={{ sm: "0.9rem", md: "1rem" }} 
              p={{ sm: "2", md: "4" }} 
              backgroundColor="transparent"
              borderWidth="2px"
              borderColor="pink.500"
              color="gray.50"
              transition="background-color color 0.2s"
              _hover={{
                backgroundColor: "pink.500"
              }}
            >
              Criar conta
            </Button>
          </Link>
        </HStack>
      </Flex>
    </MotionFlex>
  )
}