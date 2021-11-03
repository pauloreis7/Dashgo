import { easing } from './GlobalAnimations'

export const flexAnimation = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.3,
      duration: 0.6,
      ease: easing
    }
  }
}

export const childrenItemAnimation = {
  initial: { y: -60, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
  }
}
