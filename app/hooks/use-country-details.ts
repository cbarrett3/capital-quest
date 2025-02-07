'use client'

import { useState } from 'react'
import { Country } from '@/app/types/country'

// manages country details and modal state
export function useCountryDetails() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchCountryDetails = async (country: Country) => {
    try {
      setError(null)
      // show basic info while fetching details
      setSelectedCountry(country)
      
      const res = await fetch(`https://api.worldbank.org/v2/country/${country.id}?format=json`)
      if (!res.ok) throw new Error()
      
      const data = await res.json()
      setSelectedCountry(data[1][0])
    } catch {
      setSelectedCountry(null)
      setError("unable to load country details. please try again later.")
    }
  }

  const clearSelectedCountry = () => {
    setSelectedCountry(null)
    setError(null)
  }

  return {
    selectedCountry,
    error,
    fetchCountryDetails,
    clearSelectedCountry
  } as const
}
