import { Box, Text } from "@chakra-ui/react"
import Image from 'next/image'

import { 
  MotionBox,
  MotionFlex,
} from '../animations/GlobalAnimations'

export function DashDetails() {

  return (
    <MotionFlex
      w="100%"
      h="80vh"
      justify="space-between"
      align="center" 
      backgroundColor="gray.925"
      position="relative"
    >
      <MotionFlex
        w="100%"
        h="100%"
        flexDirection="column"
        justify="flex-start"
        align="flex-start"
        p="8"
      >
        <Text
          as="h1"
          maxW="36rem"
          mb="8"
          fontSize="5xl"
          fontWeight="700"
          fontStyle="italic"
          textShadow="4px 0 0 #181B23"
          color="pink.500"
        >
          Dashgo é a plataforma ideal para você
        </Text>

        <Text
          fontSize="xl"
          color="gray.100"
          textAlign="justify"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae veniam ratione corporis neque, sunt ea voluptates repellat tenetur voluptatibus dignissimos provident maiores aperiam porro sit possimus ad libero. Dicta, neque!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe molestiae ab unde velit voluptate quas tempore, reprehenderit delectus qui eos itaque eum quasi illum voluptatem magni maiores ut deleniti aliquid.
        </Text>
      </MotionFlex>

      <Box w="100%" h="100%" position="relative">
        <Image 
          src="/images/dashDetails.gif" 
          layout="fill" 
          objectFit="cover"
          alt="dash details"
        />
      </Box>
    </MotionFlex>
  )
}