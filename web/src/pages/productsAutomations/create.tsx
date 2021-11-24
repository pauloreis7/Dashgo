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

type CreateProductAutomationFormData = {
  name: string;
  description: string;
}

const createProductAutomationFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  description: yup.string().required('descrição obrigatória')
  .max(50, 'Máximo de 50 caracteres'),
})

export default function CreateProductAutomation() {
  const router = useRouter()
  
  const toast = useToast()

  const createProductAutomation = useMutation(
    async (productAutomation: CreateProductAutomationFormData) => {
    const response = await api.post('/productsAutomations/create', productAutomation)

    return response.data.productAutomation
  }, {
    onSuccess: async (_, productAutomation) => {
      await queryClient.invalidateQueries('productsAutomations')
      await queryClient.invalidateQueries('productsAutomationsChart')

      toast({
        title: "Automação criada.",
        description: `Automação de ${productAutomation.name} foi criada com sucesso.`,
        status: "success",
        duration: 6000,
        isClosable: true,
        position: "top-right",
      })
    },
    onError: (err) => {
      toast({
        title: "Erro ao criar automação.",
        description: err,
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "top-right",
      })
    }
  })

  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver(createProductAutomationFormSchema)
  })

  const { errors, isSubmitting } = formState

  const handleCreateProductAutomation
    : SubmitHandler<CreateProductAutomationFormData> = async (values) => {
    await createProductAutomation.mutateAsync(values)

    router.push('/productsAutomations')
  }

  return (
    <Box>
      <Head>
        <title>Criar automação | dashgo</title>
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
          onSubmit={handleSubmit(handleCreateProductAutomation)}
        >
          <Heading as="h1" size="xl" fontWeight="normal">Criar automação</Heading>

          <Divider my="6" borderColor="gray.700" />
        
          <Stack spacing="8">
            <Input
              name="name"
              label="Nome da automação"
              error={errors.name}
              {...register('name')}
            />
            <Input
              name="description"
              label="Descrição"
              error={errors.description}
              {...register('description')}
            />
          </Stack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/productsAutomations" passHref>
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