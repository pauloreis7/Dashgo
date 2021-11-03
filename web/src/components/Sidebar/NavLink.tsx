import { Link as ChakraLink, Text, Icon, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { ElementType, ReactNode } from "react";

import { ActiveLink } from "../ActiveLink";

import { MotionBox } from '../animations/GlobalAnimations'
import { sideBarContainerAnimation } from '../animations/SideBarAnimations'

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: ReactNode;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <MotionBox 
      whileHover={{ scale: 1.10 }} 
      whileTap={{ scale: 0.95 }} 
      initial="closed"
      animate="open"
      variants={sideBarContainerAnimation}
    >
      <ActiveLink href={href} passHref>
        <ChakraLink 
          display="flex" 
          align="center"  
          {...rest}
        >
          <Icon as={icon} fontSize="20" />

          <Text ml="4" fontWeight="medium">{children}</Text>
        </ChakraLink>
      </ActiveLink>
    </MotionBox>
  )
}