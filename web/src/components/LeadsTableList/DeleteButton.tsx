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
} from "@chakra-ui/react"
import { RiDeleteBin6Line } from 'react-icons/ri'

interface DeleteButtonProps {
  title: string
}

export function DeleteButton({ title }: DeleteButtonProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          size="sm"
          aria-label="Editar"
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
            <Button colorScheme="red">Deletar</Button>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}