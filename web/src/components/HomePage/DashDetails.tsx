import { Box } from "@chakra-ui/react"
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

import { 
  MotionText,
  MotionFlex,
} from '../animations/GlobalAnimations'
import { detailsHome } from '../animations/HomepageAnimations'

export function DashDetails() {
  const { ref, inView } = useInView({
    threshold: 0.3
  })

  return (
    <MotionFlex
      as="section"
      w="100%"
      h="80vh"
      justify="space-between"
      align="center" 
      backgroundColor="gray.925"
      ref={ref}
    >
      { inView && (
        <MotionFlex
          flex={1}
          h="100%"
          flexDirection="column"
          justify="flex-start"
          align="flex-start"
          p="8"
          variants={detailsHome}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
        >
          <MotionText
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
          </MotionText>

          <MotionText
            fontSize="xl"
            color="gray.100"
            textAlign="justify"
          >
            Dashgo, uma representação visual e traz uma interface gráfica das informações mais importantes para atingir um ou mais objetivos, exibir os principais indicadores para tomada de decisão que tem sido consolidado em uma única tela de computador para  ser monitorado de forma ágil. Cada vez mais utilizado entre as empresas que necessitam de agilidade e precisão nos seus processos, a dashgo pode cumprir um papel estratégico. Dashgo é a representação visual das informações em um painel excelente para melhorar as tomadas de decisão
          </MotionText>
        </MotionFlex>
      ) }

      <Box w="50%" h="100%" ml="auto" position="relative">
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