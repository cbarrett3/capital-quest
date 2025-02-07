import { Country } from '@/app/types/country'

// info sections configuration for the country modal
export const countryInfoSections = [
  {
    id: 'region',
    title: 'Region',
    getValue: (country: Country) => country.region?.value || 'Unknown',
    gradient: 'bg-gradient-to-r from-emerald-500 to-teal-500'
  },
  {
    id: 'income',
    title: 'Income Level',
    getValue: (country: Country) => country.incomeLevel?.value || 'Unknown',
    gradient: 'bg-gradient-to-r from-amber-500 to-orange-500'
  },
  {
    id: 'lending',
    title: 'Lending Type',
    getValue: (country: Country) => country.lendingType?.value || 'Unknown',
    gradient: 'bg-gradient-to-r from-rose-500 to-pink-500'
  },
  {
    id: 'code',
    title: 'Country Code',
    getValue: (country: Country) => country.id,
    gradient: 'bg-gradient-to-r from-violet-500 to-purple-500'
  }
]
