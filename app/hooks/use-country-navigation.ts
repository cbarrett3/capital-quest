'use client'

import { Country } from '@/app/types/country'

// handles navigation between countries in the list
export function useCountryNavigation(
  countries: readonly Country[],
  selectedCountry: Country | null,
  onSelect: (country: Country) => void
) {
  // return empty handlers if no selection
  if (!selectedCountry || countries.length === 0) {
    return {
      hasNext: false,
      hasPrevious: false,
      handleNext: () => {},
      handlePrevious: () => {}
    }
  }

  // find current country's position in the list
  const currentIndex = countries.findIndex(c => c.id === selectedCountry.id)
  const hasNext = currentIndex < countries.length - 1
  const hasPrevious = currentIndex > 0

  // navigate to next country if available
  const handleNext = () => {
    if (hasNext) {
      onSelect(countries[currentIndex + 1])
    }
  }

  // navigate to previous country if available
  const handlePrevious = () => {
    if (hasPrevious) {
      onSelect(countries[currentIndex - 1])
    }
  }

  return {
    hasNext,
    hasPrevious,
    handleNext,
    handlePrevious
  }
}
