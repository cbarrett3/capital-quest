'use client'

import { motion } from 'framer-motion';
import { Country } from '@/app/types/country';
import { regionColors } from '@/app/utils/region-colors';

// props for our card component
interface CardProps {
  country: Country;
  index: number;
  onClick: () => void;
}

// nice animation when card appears
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function Card({ country, index, onClick }: CardProps) {
  // get region info for colors
  const region = country.region?.value || 'unknown';
  const colors = regionColors[region as keyof typeof regionColors] ?? {
    bg: 'bg-gray-500',
    hover: 'hover:bg-gray-600',
    text: 'text-white',
    ring: 'ring-gray-400',
    gradient: 'from-gray-500 to-gray-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onClick}
      className="group relative bg-white rounded-xl shadow-sm border border-gray-200 
               overflow-hidden cursor-pointer transition-all duration-300
               hover:shadow-lg hover:-translate-y-1"
    >
      {/* show region color at top */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${colors.gradient}`} />

      {/* card content */}
      <div className="p-4">
        {/* country name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-1 tracking-tight line-clamp-1">
          {country.name}
        </h3>

        {/* capital city */}
        <p className="text-sm text-gray-600 mb-2 line-clamp-1">
          {country.capitalCity || 'capital unknown'}
        </p>

        {/* region and country code */}
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
            {region}
          </span>
          <span className="text-xs font-medium text-gray-400">
            {country.id}
          </span>
        </div>
      </div>

      {/* shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer
                    bg-gradient-to-r from-transparent via-white/10 to-transparent
                    pointer-events-none" />
    </motion.div>
  );
}
