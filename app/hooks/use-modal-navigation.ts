// handles keyboard navigation and scroll lock
import { useEffect } from 'react'

interface ModalNavigationProps {
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
  hasNext: boolean
  hasPrevious: boolean
}

export const useModalNavigation = ({
  onClose,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious
}: ModalNavigationProps) => {
  useEffect(() => {
    // handle keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'Escape': onClose(); break
        case 'ArrowRight':
        case 'ArrowDown': if (hasNext) onNext(); break
        case 'ArrowLeft':
        case 'ArrowUp': if (hasPrevious) onPrevious(); break
      }
    }

    // lock scroll while modal is open
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, onNext, onPrevious, hasNext, hasPrevious])
}
