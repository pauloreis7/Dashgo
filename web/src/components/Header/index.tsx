import { Flex, IconButton, Icon, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";

import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { useAuth } from "../../contexts/AuthContext";
import { Logo } from './Logo'
import { SignOutNav } from "./SignOutNav";
import { Profile } from "./Profile";

export function Header() {
  const { onOpen } = useSidebarDrawer()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  const { user } = useAuth()

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      { !isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        >

        </IconButton>
      )}

      <Logo />

      <Flex align="center" ml="auto">
        <SignOutNav />

        <Profile
          showProfileData={isWideVersion}
          name={user?.name}
          email={user?.email}
        />
      </Flex>
    </Flex>
  )
}