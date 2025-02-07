'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Country } from '@/app/types/country'
import { useModalNavigation } from '@/app/hooks/use-modal-navigation'

// props for the modal
interface CountryModalProps {
  country: Country
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
  hasNext: boolean
  hasPrevious: boolean
}

// ui components
const InfoSection = ({ title, value, gradient }: { 
  title: string
  value: string
  gradient: string 
}) => (
  <div className="flex flex-col gap-0.5">
    <h4 className={`text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}>
      {title}
    </h4>
    <p className="text-gray-800 text-sm">{value}</p>
  </div>
)

// modal content config
const modalAnimation = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: {
    type: 'spring',
    stiffness: 200,
    damping: 20,
    mass: 0.8
  }
} as const

const infoSections = [
  { 
    id: 'region',
    title: 'region',
    getValue: (c: Country) => c.region?.value || 'unknown',
    gradient: 'from-emerald-500 to-teal-500'
  },
  { 
    id: 'income',
    title: 'income level',
    getValue: (c: Country) => c.incomeLevel?.value || 'unknown',
    gradient: 'from-amber-500 to-orange-500'
  },
  { 
    id: 'lending',
    title: 'lending type',
    getValue: (c: Country) => c.lendingType?.value || 'unknown',
    gradient: 'from-rose-500 to-pink-500'
  },
  { 
    id: 'code',
    title: 'country code',
    getValue: (c: Country) => c.id || 'unknown',
    gradient: 'from-violet-500 to-purple-500'
  }
] as const

// main modal component
const CountryModal = ({ 
  country, 
  onClose, 
  onNext, 
  onPrevious, 
  hasNext, 
  hasPrevious 
}: CountryModalProps) => {
  // handle keyboard navigation
  useModalNavigation({ onClose, onNext, onPrevious, hasNext, hasPrevious })

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-center justify-center px-14 sm:px-20"
           role="presentation"
           onClick={onClose}>
        {/* previous button */}
        {hasPrevious && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all border border-gray-100 z-[60]"
            aria-label="previous country"
          >
            ←
          </button>
        )}
        
        {/* next button */}
        {hasNext && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all border border-gray-100 z-[60]"
            aria-label="next country"
          >
            →
          </button>
        )}
        
        <motion.div
          className="w-full max-w-md bg-white rounded-xl shadow-xl z-50 overflow-y-auto max-h-[calc(100vh-4rem)]"
          initial={modalAnimation.initial}
          animate={modalAnimation.animate}
          exit={modalAnimation.exit}
          onClick={e => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="relative px-5 py-4 sm:p-6">
            <button
              type="button"
              aria-label="close modal"
              onClick={onClose}
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-500 transition-colors"
            >
              ×
            </button>
            <h2 id="modal-title" className="text-2xl font-bold text-gray-900 mb-2">
              {country.name}
            </h2>
            <p className="text-lg text-gray-600">
              {country.capitalCity || 'capital unknown'}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {infoSections.map(({ id, title, getValue, gradient }) => (
                <InfoSection
                  key={id}
                  title={title}
                  value={getValue(country)}
                  gradient={gradient}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default CountryModal
