import { Flex, Stack, FlexProps, StackProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export const flexAnimation = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.3
    }
  }
}

export const childrenItemAnimation = {
  hidden: { y: -60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  }
}

export const MotionFlex = motion<FlexProps>(Flex)
export const MotionStack = motion<StackProps>(Stack)