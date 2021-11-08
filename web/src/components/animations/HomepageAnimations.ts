import { easing } from './GlobalAnimations'

export const fadeInDownHeaderHome = {
  initial: {
    y: -40,
    opacity: 0,
    transition: { duration: 0.6, ease: easing }
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing
    }
  }
}

export const fadeInUpHome = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.2,
      delay: 0.3,
      staggerChildren: 0.5,
      ease: easing,
      duration: 0.8,
    },
  }
}
