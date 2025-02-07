// smooth spring animation for modal transitions
export const modalSpring = {
  type: "spring" as const,
  stiffness: 200,
  damping: 20,
  mass: 0.8
}

// fade and slide animations for modal content
export const modalContentAnimation = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: modalSpring
}

// fade animation for backdrop
export const backdropAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}
