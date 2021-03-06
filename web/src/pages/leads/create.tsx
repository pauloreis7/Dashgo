import { Flex, Box, Heading, Divider, Stack, HStack, Button, useToast } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import * as yup from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import { api } from '../../services/apiClient'
import { queryClient } from '../../services/queryClient'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import Head from 'next/head'

import { Input } from '../../components/Form/Input'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'

import { MotionBox, containerAnimation } from '../../components/animations/GlobalAnimations'

type CreateLeadFormData = {
  name: string;
  email: string;
}

const createLeadFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
})

export default function CreateLead() {
  const router = useRouter()

  const toast = useToast()

  const createLead = useMutation(async (lead: CreateLeadFormData) => {
    try {
      const response = await api.post('/leads/create', lead)

      return response.data.lead
    } catch (err) {
      const errorMessage = err.response?.data.message 
      ?? `Erro interno de servidor, tente novamente mais tarde! (${err.message})`

      throw new Error(errorMessage)
    }
  }, {
    onSuccess: async (_, lead) => {
      await queryClient.invalidateQueries('leads')
      await queryClient.invalidateQueries('leadsChart')

      toast({
        title: "Lead criado.",
        description: `Lead ${lead.name} foi criado com sucesso.`,
        status: "success",
        duration: 6000,
        isClosable: true,
        position: "top-right",
      })
    }
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createLeadFormSchema)
  })

  const { errors, isSubmitting } = formState

  const handleCreateLead: SubmitHandler<CreateLeadFormData> = async (values) => {
    try {
      await createLead.mutateAsync(values)

      router.push('/leads')
    } catch (err) {
      toast({
        title: "Erro ao criar lead.",
        description: err.message,
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
        <title>Criar lead | dashgo</title>
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
          onSubmit={handleSubmit(handleCreateLead)}
        >
          <Heading as="h1" size="xl" fontWeight="normal">Criar lead</Heading>

          <Divider my="6" borderColor="gray.700" />
        
          <Stack spacing="8">
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
          </Stack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/leads" passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
              </Link>

              <Button 
                type="submit" 
                colorScheme="pink"
                isLoading={isSubmitting} 
              >
                Criar
              </Button>
            </HStack>
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