import { HStack, Icon, IconButton } from "@chakra-ui/react";
import { RiUserAddLine } from "react-icons/ri";
import { FiPower } from "react-icons/fi";

import { useAuth } from '../../contexts/AuthContext'

export function NotificationsNav() {
  const { signOut } = useAuth()

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
      <Icon as={RiUserAddLine} fontSize="20" />
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
        onClick={signOut}
      />
    </HStack>
  )
}