import { 
  Flex,
  Text,
  Button,
  Heading,
  Divider,
  Icon,
  useToast,
  Link as ChakraLink
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import * as yup from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { parseCookies } from 'nookies'
import { RiLoginBoxLine } from 'react-icons/ri'
 
import { useAuth } from '../../contexts/AuthContext'

import { Input } from '../../components/Form/Input'

import { 
  MotionFlex, 
  MotionStack, 
  fadeInUpForms 
} from '../../components/animations/GlobalAnimations'
import { flexAnimation } from '../../components/animations/SignInAnimations'

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
})

export default function SignIn() {
  const { signIn } = useAuth()

  const toast = useToast()

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const { errors, isSubmitting } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    try {
      const { email, password } = data

      await signIn({ email, password })
      
      toast({
        title: "Login realizado.",
        description: "Login feito com sucesso.",
        status: "success",
        duration: 6000,
        isClosable: true,
        position: "top-right",
      })
    } catch (err) {
      toast({
        title: "Erro ao fazer login.",
        description: err.message,
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "top-right",
      })
    }
  }

  return (
    <MotionFlex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      p="10"
      initial='initial' 
      animate='animate'
      exit={{ opacity: 0 }}
    >
      <MotionFlex
        as="form"
        width="100%"
        maxWidth={480}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        variants={flexAnimation}
        initial="initial"
        animate="animate"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <MotionStack spacing="4" variants={fadeInUpForms}>
          <Heading as="h1" size="lg" textAlign="center">Faça Login</Heading>

          <Divider my={["4", "6"]} borderColor="gray.700" />

          <Input 
            name="email" 
            type="email" 
            label="E-mail" 
            error={errors.email}
            {...register('email')}
          />

          <Input
            name="password"
            type="password"
            label="Senha"
            error={errors.password}
            {...register('password')}
          />
        </MotionStack>
        
        <MotionFlex
          flexDirection="column"
          variants={fadeInUpForms}
        >
          <Button
            type="submit"
            my="6"
            colorScheme="pink"
            size="lg"
            cursor="pointer"
            rightIcon={<Icon as={RiLoginBoxLine} fontSize="20" />}
            isLoading={isSubmitting}
          >
            Entrar
          </Button>

          <Text align="center" fontSize="lg">Ainda não tem uma conta? 
            <Link href="/account/signup" passHref>
              <ChakraLink ml="2" color="pink.500" fontWeight="bold">
                Crie agora
              </ChakraLink>
            </Link>
          </Text>
        </MotionFlex>
      </MotionFlex>
    </MotionFlex>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['@dashgo.token']: token } = parseCookies(ctx)
  
  if(token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      }
    }
  }

  return {
    props: {},
  }
}