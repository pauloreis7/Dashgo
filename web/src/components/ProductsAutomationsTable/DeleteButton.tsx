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
  productAutomationId: string
}

export function DeleteButton({ productAutomationId, title }: DeleteButtonProps) {
  const toast = useToast()
  
  const deleteProductAutomation = useMutation(async () => {
    try {
      await api.delete('/productsAutomations/delete', {
        params: {
          productAutomationId
        }
      })
  
      return
    } catch (err) {
      const errorMessage = err.response?.data.message 
      ?? `Erro interno de servidor, tente novamente mais tarde! (${err.message})`

      throw new Error(errorMessage)
    }
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('productsAutomations')
      await queryClient.invalidateQueries('productsAutomationsChart')

      toast({
        title: "Automação deletada.",
        description: "Automação foi deletada com sucesso.",
        status: "success",
        duration: 6000,
        isClosable: true,
        position: "top-right",
      })
    }
  })

  async function handleDeleteProductAutomation() {
    try {
      await deleteProductAutomation.mutateAsync()
    } catch (err) {
      toast({
        title: "Erro ao deletar a automação do produto.",
        description: err.message,
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "top-right",
      })
    }
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
              onClick={handleDeleteProductAutomation}
              isLoading={useMutation({ mutationKey: 'productsAutomations' }).isLoading}
            >
              Deletar
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}