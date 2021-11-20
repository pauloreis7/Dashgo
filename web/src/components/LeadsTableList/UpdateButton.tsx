import {
  IconButton,
  ButtonGroup,
  Button,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Portal,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
  useToast
} from "@chakra-ui/react"
import { useMutation } from 'react-query'
import FocusLock from 'react-focus-lock'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { RiPencilLine } from 'react-icons/ri'

import { api } from "../../services/apiClient"

import { queryClient } from '../../services/queryClient'
import { Input } from '../Form/Input'

interface UpdateButtonProps {
  leadId: string
  initialName: string
  initialEmail: string
  title: string
}

type UpdateLeadFormData = {
  name: string;
  email: string;
}

const updateLeadFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
})

export function UpdateButton({ 
  leadId, 
  initialName, 
  initialEmail, 
  title 
}: UpdateButtonProps) {
  const { onOpen, onClose, isOpen } = useDisclosure()

  const toast = useToast()

  const updateLead = useMutation(async (lead: UpdateLeadFormData) => {
    const response = await api.put('/leads/update', lead, {
      params: {
        leadId
      }
    })

    return response.data.lead
  }, {
    onSuccess: async (_, lead) => {
      await queryClient.invalidateQueries('leads')

      toast({
        title: "Lead atualizado.",
        description: `Lead ${lead.name} foi atualizado com sucesso.`,
        status: "success",
        duration: 6000,
        isClosable: true,
        position: "top-right",
      })
    },
    onError: (err) => {
      toast({
        title: "Erro ao atualizar lead.",
        description: err,
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "top-right",
      })
    }
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(updateLeadFormSchema)
  })

  const { errors, isSubmitting } = formState

  const handleEditLead: SubmitHandler<UpdateLeadFormData> = async (values) => {
    await updateLead.mutateAsync(values)

    onClose()
  }

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="right"
      closeOnBlur={false}
    >
      <PopoverTrigger>
      <IconButton
        size="sm"
        aria-label="Editar"
        bgColor="blue.600"
        _hover={{
          filter: "brightness(0.9)",
          transition: "filter 0.2s"
        }}
        icon={<RiPencilLine fontSize="18" />}
      />
      </PopoverTrigger>
      <Portal>
        <PopoverContent bg="gray.800" borderColor="gray.800">
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow bgColor="gray.800" />
            <PopoverHeader
              fontSize="lg"
              fontWeight="bold"
              borderBottomColor="gray.700"
            >
              {title}
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <Stack 
                as="form" 
                spacing="4"
                onSubmit={handleSubmit(handleEditLead)}
              >
                <Input
                  name="name"
                  label="Nome completo"
                  error={errors.name}
                  defaultValue={initialName}
                  {...register('name')}
                />
                <Input
                  name="email"
                  type="email"
                  label="E-mail"
                  error={errors.email}
                  defaultValue={initialEmail}
                  {...register('email')}
                />
                <ButtonGroup d="flex" justifyContent="flex-end">
                  <Button 
                    variant="outline"
                    colorScheme="gray.300"
                    _hover={{
                      backgroundColor: "none",
                      borderColor: "red.500",
                      color: "red.500",
                      transition: "border-color color 0.2s"
                    }}
                    onClick={onClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    colorScheme="pink"
                    isLoading={isSubmitting}
                  >
                    Editar
                  </Button>
                </ButtonGroup>
              </Stack>
            </PopoverBody>
          </FocusLock>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}