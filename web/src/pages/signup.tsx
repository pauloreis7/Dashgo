import { 
  Flex,
  Text,
  Button,
  Stack,
  Heading,
  Divider,
  SimpleGrid,
  useToast,
  Link as ChakraLink
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import * as yup from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { api } from '../services/api'

import { Input } from '../components/Form/Input'

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const SignUpFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().min(6, 'No mínimo 6 dígitos'),
  password_confirmation: yup.string().required('Confirmação obrigatória')
  .oneOf([yup.ref('password')], 'Confirmação incorreta')
})

export default function SignUp() {
  const router = useRouter()

  const toast = useToast()

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(SignUpFormSchema)
  })

  const { errors, isSubmitting } = formState

  const handleSignUp: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      await api.post('/users/signup', data)

      toast({
        title: "Conta criada.",
        description: "Sua conta foi criada com sucesso.",
        status: "success",
        duration: 6000,
        isClosable: true,
        position: "top-right",
      })

      router.push('/')
    } catch (err) {
      toast({
        title: "Erro ao criar conta.",
        description: err.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      })
    }
  }

  return (
    <Flex
      w="100%"
      h="100%"
      align="center"
      justify="center"
      px={["2", "2", "10"]}
      py="4"
    >
      <Flex
        as="form"
        width="80%"
        maxWidth={920}
        bg="gray.800"
        p={["6", "6", "8"]}
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignUp)}
      >

        <Stack spacing="8">
          <Heading as="h1" size="lg" textAlign="center">Crie sua conta</Heading>

          <Divider my={["4", "6"]} borderColor="gray.700" />

          <Input
            name="name"
            label="Nome completo"
            error={errors.name}
            {...register('name')}
          />
          <Input
            name="email"
            type="email"
            label="E-mail"
            error={errors.email}
            {...register('email')}
          />

          <SimpleGrid minChildWidth="280px" spacing={["6", "6", "8"]} w="100%">
            <Input
              name="password"
              type="password"
              label="Senha"
              error={errors.password}
              {...register('password')}
            />
            <Input
              name="password_confirmation"
              type="password"
              label="Confirmação da senha"
              error={errors.password_confirmation}
              {...register('password_confirmation')}
            />
          </SimpleGrid>
        </Stack>

        <Button
          type="submit"
          my="6"
          colorScheme="pink"
          size="lg"
          isLoading={isSubmitting}
        >
          Criar
        </Button>

        <Text align="center" fontSize="lg">Já tem uma conta? 
          <Link href="/" passHref>
            <ChakraLink ml="2" color="pink.500" fontWeight="bold">
              Faça Login
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