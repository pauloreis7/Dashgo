import { 
  Flex,
  Text,
  Button,
  Stack,
  Heading,
  Divider,
  useToast,
  Link as ChakraLink
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import * as yup from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { api } from '../services/apiClient'
import { useAuth } from '../contexts/AuthContext'

import { Input } from '../components/Form/Input'

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
})

export default function Home() {
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
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      p="10"
    >
      <Flex
        as="form"
        width="100%"
        maxWidth={480}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
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
        </Stack>

        <Button
          type="submit"
          my="6"
          colorScheme="pink"
          size="lg"
          isLoading={isSubmitting}
        >Entrar</Button>

        <Text align="center" fontSize="lg">Ainda não tem uma conta? 
          <Link href="/signup" passHref>
            <ChakraLink ml="2" color="pink.500" fontWeight="bold">
              Crie agora
            </ChakraLink>
          </Link>
        </Text>
      </Flex>
    </Flex>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 * 60 * 24, // 24 hours
  }
}