'use client'

import { useState, useEffect, useCallback } from 'react'
import { Country } from '@/app/types/country'
import { Region } from '@/app/utils/region-colors'

// manages countries data and region filtering
export function useCountries() {
  // store countries and filtered results
  const [countries, setCountries] = useState<readonly Country[]>([])
  const [filteredCountries, setFilteredCountries] = useState<readonly Country[]>([])
  
  // track selected regions and any errors
  const [selectedRegions, setSelectedRegions] = useState<ReadonlySet<Region>>(new Set())
  const [error, setError] = useState<string | null>(null)

  // fetch countries when the component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://api.worldbank.org/v2/country?format=json&per_page=300')
        if (!response.ok) throw new Error('Failed to fetch countries')
        const data = await response.json()
        setCountries(data[1])
      } catch (_err) {
        setError('Unable to load countries. Please try again later.')
      }
    }

    void fetchCountries()
  }, [])

  // filter countries whenever selection changes
  useEffect(() => {
    const filtered = countries
      .filter(country => {
        const regionValue = country.region?.value
        // skip aggregates and invalid regions
        if (!regionValue || regionValue === 'Aggregates') return false
        const mappedRegion = mapApiRegionToRegion(regionValue)
        return selectedRegions.size === 0 || (mappedRegion && selectedRegions.has(mappedRegion))
      })
      .sort((a, b) => a.name.localeCompare(b.name))

    setFilteredCountries(filtered)
  }, [countries, selectedRegions])

  // map API region strings to our Region type
  const mapApiRegionToRegion = (apiRegion: string): Region | undefined => {
    // First try exact match
    const exactMapping: Record<string, Region> = {
      'East Asia & Pacific': 'East Asia & Pacific',
      'Europe & Central Asia': 'Europe & Central Asia',
      'Latin America & Caribbean': 'Latin America & Caribbean ',  // Note the space
      'Middle East & North Africa': 'Middle East & North Africa',
      'North America': 'North America',
      'South Asia': 'South Asia',
      'Sub-Saharan Africa': 'Sub-Saharan Africa '  // Note the space
    }

    // Try exact match first
    if (exactMapping[apiRegion]) {
      return exactMapping[apiRegion];
    }

    // If no exact match, try trimmed comparison
    const trimmedApiRegion = apiRegion.trim();
    const mappedRegion = Object.entries(exactMapping).find(([key]) => 
      key.trim() === trimmedApiRegion
    );

    return mappedRegion ? mappedRegion[1] : undefined;
  }

  // get unique regions, excluding aggregates and mapping to our Region type
  const regions = [...new Set(countries
    .map(c => c.region?.value)
    .filter((region): region is string => 
      region !== undefined && region !== 'Aggregates'
    )
    .map(region => mapApiRegionToRegion(region))
    .filter((region): region is Region => region !== undefined)
  )]
  .sort()

  // toggle region selection
  const toggleRegion = useCallback((region: Region) => {
    setSelectedRegions(prev => {
      const newRegions = new Set(prev)
      if (newRegions.has(region)) {
        newRegions.delete(region)
      } else {
        newRegions.add(region)
      }
      return newRegions
    })
  }, [])

  return {
    countries,
    filteredCountries,
    error,
    regions,
    selectedRegions,
    toggleRegion
  } as const
}
