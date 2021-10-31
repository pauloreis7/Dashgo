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
  useDisclosure
} from "@chakra-ui/react"
import FocusLock from 'react-focus-lock'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { RiPencilLine } from 'react-icons/ri'

import { Input } from '../Form/Input'

interface UpdateButtonProps {
  initialName: string
  initialEmail: string
  title: string
}

type UpdateUserFormData = {
  name: string;
  email: string;
}

const updateleadFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
})

export function UpdateButton({ initialName, initialEmail, title }: UpdateButtonProps) {
  const { onOpen, onClose, isOpen } = useDisclosure()

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(updateleadFormSchema)
  })

  const { errors, isSubmitting } = formState

  const handleEditUser: SubmitHandler<UpdateUserFormData> = async (values) => {
    console.log(values)
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
        // onClick={}
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
                onSubmit={handleSubmit(handleEditUser)}
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