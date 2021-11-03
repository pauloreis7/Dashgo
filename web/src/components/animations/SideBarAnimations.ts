import { easing } from './GlobalAnimations'

export const sideBarContainerAnimation = {
  open: { opacity: 1, y: 0, transition: { delay: 0.5 } },
  closed: {
    opacity: 0,
    y: "-100%",
    transition: {
      staggerChildren: 0.1,
      duration: 0.7,
      ease: easing
    }
  }
}