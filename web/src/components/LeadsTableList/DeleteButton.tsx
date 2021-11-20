import {
  IconButton,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Portal,
  PopoverArrow,
  PopoverCloseButton,
  useToast,
} from "@chakra-ui/react"
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useMutation } from "react-query"

import { api } from "../../services/apiClient"
import { queryClient } from "../../services/queryClient"

interface DeleteButtonProps {
  title: string
  leadId: string
}

export function DeleteButton({ leadId, title }: DeleteButtonProps) {
  const toast = useToast()
  
  const deleteLead = useMutation(async () => {
    await api.delete('/leads/delete', {
      params: {
        leadId
      }
    })

    return
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('leads')
      await queryClient.invalidateQueries('leadsChart')

      toast({
        title: "Lead deletado.",
        description: "Lead foi deletado com sucesso.",
        status: "success",
        duration: 6000,
        isClosable: true,
        position: "top-right",
      })
    },
    onError: (err) => {
      toast({
        title: "Erro ao deletar o lead.",
        description: err,
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "top-right",
      })
    }
  })

  async function handleDeleteLead() {
    await deleteLead.mutateAsync()
  }

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          size="sm"
          aria-label="Deletar"
          _hover={{
            color: "red.600",
            transition: "color 0.2s"
          }}
          color="gray.300"
          colorScheme="none"
          icon={<RiDeleteBin6Line fontSize="20" />}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent bg="gray.800" borderColor="gray.800">
          <PopoverArrow bgColor="gray.800" />
          <PopoverHeader borderBottomColor="gray.700">{title}</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Button 
              colorScheme="red" 
              onClick={handleDeleteLead}
              isLoading={useMutation({ mutationKey: 'leads' }).isLoading}
            >
              Deletar
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}