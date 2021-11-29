import { Flex, Box, Text, Avatar } from "@chakra-ui/react";
import Link from 'next/link'

interface ProfileProps {
  showProfileData: boolean;
  name?: string;
  email?: string;
}

export function Profile({ 
  showProfileData = true, 
  name = '*****', 
  email = '*********' 
}: ProfileProps) {
  return (
    <Link href="/profile" passHref>
      <Flex align="center" cursor="pointer">
        { showProfileData && (
          <Box mr="4" textAlign="right">
            <Text>{name}</Text>
            <Text color="gray.300" fontSize="small">
              {email}
            </Text>
          </Box>
        )}

        <Avatar size="md" name={name} />
      </Flex>
    </Link>
  )
}