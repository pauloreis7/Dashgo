import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Paulo Reis</Text>
        <Text color="gray.300" fontSize="small">
          paulosilvadosreis2057@gmail.com
        </Text>
      </Box>

      <Avatar size="md" name="Paulo Reis" src="http://github.com/pauloreis7.png" />
    </Flex>
  )
}