import { 
  Flex,
  Button,
  Stack,
  Heading
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { Input } from '../components/Form/Input'

type SignInFormData = {
  email: string;
  password: string;
}

export default function Home() {
  const { register, handleSubmit, formState } = useForm()

  const handleSignIn: SubmitHandler<SignInFormData> = (values) => {
    
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
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

          <Input
            name="email"
            type="email"
            label="E-mail"
            {...register('email')}
          />

          <Input
            name="password"
            type="password"
            label="Senha"
            {...register('password')}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >Entrar</Button>
      </Flex>
    </Flex>
  )
}
