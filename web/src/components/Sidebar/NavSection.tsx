import { Box, Text, Stack } from "@chakra-ui/layout";
import { ReactNode } from "react";

import { MotionText } from '../animations/GlobalAnimations'
import { sideBarContainerAnimation } from '../animations/SideBarAnimations'

interface NavSectionProps {
  title: string;
  children: ReactNode;
}

export function NavSection({ title, children }: NavSectionProps) {
  return (
    <Box>
      <MotionText 
        fontWeight="bold" 
        color="gray.400" 
        fontSize="small"
        initial="closed"
        animate="open"
        variants={sideBarContainerAnimation}
      >
        {title}
      </MotionText>

      <Stack
        spacing="4"
        mt="8"
        align="stretch"
      >
        {children}
      </Stack>
    </Box>
  )
}