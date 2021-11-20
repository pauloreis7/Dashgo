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

export const coinsHome = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.5,
      ease: easing,
      duration: 0.6,
    },
  },
}

export const detailsHome = {
  initial: { opacity: 0, x: -100 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      ease: easing,
      duration: 0.8,
    },
  }
}

export const footerLinksContainerHome = {
  initial: { opacity: 0, x: 70 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      ease: easing,
    },
  }
}
