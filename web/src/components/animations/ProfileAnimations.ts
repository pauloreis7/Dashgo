import { Box, BoxProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export const boxAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.3
    }
  }
}

export const MotionBox = motion<BoxProps>(Box)