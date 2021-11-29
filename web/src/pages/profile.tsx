import { 
  Flex, 
  Box, 
  Heading, 
  Icon,
  Divider, 
  Stack, 
  Button, 
  SimpleGrid,
  Tooltip,
  useToast 
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import * as yup from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RiInformationLine } from 'react-icons/ri'
import { RiPencilLine } from 'react-icons/ri'
import { parseCookies } from 'nookies'
import Head from 'next/head'

import { api } from '../services/apiClient'
import { useAuth } from '../contexts/AuthContext'

import { Input } from '../components/Form/Input'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'

import { MotionBox, containerAnimation } from '../components/animations/GlobalAnimations'

type UpdateUserFormData = {
  name: string;
  email: string;
  old_password?: string;
  password?: string;
  password_confirmation?: string;
}

const UpdateUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().when('old_password', {
    is: value => value && value.length > 0,
    then: yup.string().min(6, 'Mínimo de 6 caracteres'),
  }),
  old_password: yup.string().when('password', {
    is: value => value && value.length > 0,
    then: yup.string().required('Para alterar a senha coloque sua senha antiga'),
  }),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'As senhas precisam ser iguais')
},
  [['password', 'old_password']]
)

export default function UpdateUser() {
  const toast = useToast()

  const { user, setUser } = useAuth()

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(UpdateUserFormSchema)
  })

  const { errors, isSubmitting } = formState

  const handleUpdateUser: SubmitHandler<UpdateUserFormData> = async (data) => {
    try {
      const response = await api.put('/users/update', data)

      setUser(response.data)

      toast({
        title: "Atualização realizada.",
        description: "Atualização feita com sucesso.",
        status: "success",
        duration: 6000,
        isClosable: true,
        position: "top-right",
      })
    } catch (err) {
      const errorMessage = err.response?.data.message 
      ?? `Erro interno de servidor, tente novamente mais tarde! (${err.message})`

      toast({
        title: "Erro ao fazer atualização.",
        description: errorMessage,
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "top-right",
      })
    }
  }

  return (
    <Box>
      <Head>
        <title>Seu perfil | dashgo</title>
      </Head>

      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <MotionBox 
          as="form" 
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          variants={containerAnimation}
          initial="initial"
          animate="animate"
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit(handleUpdateUser)}
        >
          <Heading as="h1" size="xl" fontWeight="normal">Seu Perfil</Heading>

          <Divider my="6" borderColor="gray.700" />
        
          <Stack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="name"
                label="Nome completo"
                error={errors.name}
                defaultValue={user?.name}
                {...register('name')}
              />
              <Input
                name="email"
                type="email"
                label="E-mail"
                error={errors.email}
                defaultValue={user?.email}
                {...register('email')}
              />
            </SimpleGrid>

            <Flex direction="column">

              <Heading 
                as="h3" 
                fontSize="2xl"
                fontWeight="normal" 
                position="relative" 
                maxWidth={230}
              >
                Alteração de senha

                <Tooltip
                  label="Preencha essa seção somente se quiser alterar sua senha"
                  placement="top"
                >
                  <span>
                    <Icon 
                      position="absolute"
                      top="0"
                      right="0"
                      as={RiInformationLine} 
                      fontSize={["sm", "md"]}
                      color="gray.600"
                    />
                  </span>
                </Tooltip>
              </Heading>

              <Divider mt={["2", "4"]} borderColor="gray.700" />

            </Flex>

            <Stack
              w="100%"
              spacing={["6", "8"]} 
            >
              <Input
                width="100%"
                name="old_password"
                type="password"
                label="Senha antiga"
                error={errors.old_password}
                {...register('old_password')}
              />

              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <Input
                  gridArea="pass"
                  name="password"
                  type="password"
                  label="Nova senha"
                  error={errors.password}
                  {...register('password')}
                />
                <Input
                  gridArea="confirm"
                  name="password_confirmation"
                  type="password"
                  label="Confirmação da senha"
                  error={errors.password_confirmation}
                  {...register('password_confirmation')}
                />
              </SimpleGrid>
            </Stack>
          </Stack>

          <Flex mt="8" px="2" justify="center">
            <Button
              type="submit"
              w="80%"
              my="6"
              colorScheme="pink"
              fontSize="xl"
              cursor="pointer"
              rightIcon={<Icon as={RiPencilLine} fontSize="20" />}
              isLoading={isSubmitting}
            >
              Atualizar
            </Button>
          </Flex>
        </MotionBox>
      </Flex>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['@dashgo.token']: token } = parseCookies(ctx)
  
  if(!token) {
    return {
      redirect: {
        destination: '/account/signin',
        permanent: false,
      }
    }
  }

  return {
    props: {},
  }
}