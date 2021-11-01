import { Flex, Box, Text, Avatar } from "@chakra-ui/react";
import Link from 'next/link'

interface ProfileProps {
  showProfileData: boolean;
  name: string;
  email: string;
}

export function Profile({ showProfileData = true, name, email }: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{name}</Text>
          <Text color="gray.300" fontSize="small">
            {email}
          </Text>
        </Box>
      )}
      <Link href="/profile" passHref>
        <Avatar size="md" name={name} src="http://github.com/pauloreis7.png" />
      </Link>
    </Flex>
  )
}