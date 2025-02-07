import { renderHook } from '@testing-library/react';
import { useCountryNavigation } from '../use-country-navigation';

// sample data for testing
const mockCountries = [
    {
        id: '1',
        name: 'Canada',
        capitalCity: 'Ottawa',
        region: { value: 'North America' },
        incomeLevel: { value: 'High income' },
        lendingType: { value: 'Not classified' }
    },
    {
        id: '2',
        name: 'USA',
        capitalCity: 'Washington D.C.',
        region: { value: 'North America' },
        incomeLevel: { value: 'High income' },
        lendingType: { value: 'Not classified' }
    },
    {
        id: '3',
        name: 'Mexico',
        capitalCity: 'Mexico City',
        region: { value: 'North America' },
        incomeLevel: { value: 'Upper middle income' },
        lendingType: { value: 'IBRD' }
    }
];

describe('useCountryNavigation', () => {
    // mock the select handler
    const handleSelect = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('handles no selection', () => {
        const { result } = renderHook(() =>
            useCountryNavigation(mockCountries, null, handleSelect)
        );

        // should disable navigation when no country is selected
        expect(result.current.hasNext).toBe(false);
        expect(result.current.hasPrevious).toBe(false);
    });

    it('handles first country', () => {
        const { result } = renderHook(() =>
            useCountryNavigation(mockCountries, mockCountries[0], handleSelect)
        );

        // should only allow next navigation
        expect(result.current.hasNext).toBe(true);
        expect(result.current.hasPrevious).toBe(false);

        // next should select usa
        result.current.handleNext();
        expect(handleSelect).toHaveBeenCalledWith(mockCountries[1]);
    });

    it('handles last country', () => {
        const { result } = renderHook(() =>
            useCountryNavigation(mockCountries, mockCountries[2], handleSelect)
        );

        // should only allow previous navigation
        expect(result.current.hasNext).toBe(false);
        expect(result.current.hasPrevious).toBe(true);

        // previous should select usa
        result.current.handlePrevious();
        expect(handleSelect).toHaveBeenCalledWith(mockCountries[1]);
    });
});
