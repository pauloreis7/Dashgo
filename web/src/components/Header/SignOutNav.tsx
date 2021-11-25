import { HStack, IconButton, useToast } from "@chakra-ui/react";
import { FiPower } from "react-icons/fi";

import { useAuth } from '../../contexts/AuthContext'

export function SignOutNav() {
  const { signOut } = useAuth()
  const toast = useToast()

  function handleSignOut() {
    try {
      signOut()

    } catch (err) {
      toast({
        title: "Erro ao fazer logout.",
        description: err.message,
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "top-right",
      })
    }
  }

  return (
    <HStack
      spacing={["6", "8"]}
      mx={["6", "8"]}
      pr={["6", "8"]}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <IconButton
        aria-label="Sign Out"
        variant="outline"
        borderWidth="0.125rem"
        colorScheme="gray.300"
        _hover={{
          color: 'pink.400',
        }}
        fontSize="20"
        borderRadius="0.65rem"
        icon={<FiPower fontSize="20" />}
        onClick={handleSignOut}
      />
    </HStack>
  )
}