'use client'

import { Country } from '@/app/types/country'
import Card from '@/app/components/card'

interface CountryGridProps {
  countries: readonly Country[]
  onSelect: (country: Country) => void
}

export const CountryGrid = ({ countries, onSelect }: CountryGridProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
    {countries.map((country, index) => (
      <Card
        key={country.id}
        country={country}
        index={index}
        onClick={() => onSelect(country)}
      />
    ))}
  </div>
)
