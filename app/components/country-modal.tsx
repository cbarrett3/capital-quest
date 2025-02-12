'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Country } from '@/app/types/country'
import { useModalNavigation } from '@/app/hooks/use-modal-navigation'
import { regionColors } from '@/app/utils/region-colors'

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
    <h3 className={`text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}>
      {title}
    </h3>
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

  const region = country.region?.value || 'unknown';
  const colors = regionColors[region as keyof typeof regionColors] ?? {
    bg: 'bg-gray-500',
    hover: 'hover:bg-gray-600',
    text: 'text-white',
    ring: 'ring-gray-400',
    gradient: 'from-gray-500 to-gray-600'
  };

  return (
    <AnimatePresence>
      <div 
        aria-live="assertive"
        className="sr-only"
      >
        {country.name}. Capital: {country.capitalCity || 'capital unknown'}. {region} region.
      </div>
      <motion.div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-center justify-center px-14 sm:px-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}>
        {/* previous button */}
        {hasPrevious && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            className={`absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full 
                     bg-gray-100 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 shadow-lg transition-all border border-gray-100 dark:border-gray-700 z-[60]
                     focus:outline-none focus:ring-2 focus:ring-offset-2`}
            aria-label="View previous country"
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
            className={`absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full 
                     bg-gray-100 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 shadow-lg transition-all border border-gray-100 dark:border-gray-700 z-[60]
                     focus:outline-none focus:ring-2 focus:ring-offset-2`}
            aria-label="View next country"
          >
            →
          </button>
        )}
        
        <motion.div
          className={`w-full max-w-md bg-white rounded-xl shadow-xl z-50 overflow-y-auto max-h-[calc(100vh-4rem)]
                     ring-2 ${colors.ring}`}
          initial={modalAnimation.initial}
          animate={modalAnimation.animate}
          exit={modalAnimation.exit}
          onClick={e => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div className="relative px-5 py-4 sm:p-6">
            <button
              type="button"
              aria-label={`Close details for ${country.name}`}
              onClick={onClose}
              className={`absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-500 transition-colors
                       focus:outline-none focus:ring-2 focus:ring-offset-2 ${colors.ring} rounded-lg`}
            >
              ×
            </button>
            <h2 id="modal-title" className="text-2xl font-bold text-gray-900 mb-2">
              {country.name}
            </h2>
            <p id="modal-description" className="text-lg text-gray-600">
              Capital: {country.capitalCity || 'capital unknown'}
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
      </motion.div>
    </AnimatePresence>
  )
}

export default CountryModal
