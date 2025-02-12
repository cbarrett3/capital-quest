import { render, screen, fireEvent } from '@testing-library/react';
import { RegionFilter } from '../region-filter';
import { Region } from '@/app/utils/region-colors';

// sample data for testing
const mockRegions: Region[] = ['North America', 'Europe & Central Asia', 'East Asia & Pacific'];

describe('RegionFilter', () => {
    // mock the toggle handler
    const handleToggle = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('shows all region buttons', () => {
        render(
            <RegionFilter
                regions={mockRegions}
                selectedRegions={new Set()}
                onToggleRegion={handleToggle}
                totalCountries={100}
                filteredCount={100}
            />
        );

        // check if all regions are shown
        mockRegions.forEach(region => {
            expect(screen.getByRole('button', { name: `${region} region toggle button` })).toBeInTheDocument();
        });
    });

    it('calls toggle handler when region is clicked', () => {
        render(
            <RegionFilter
                regions={mockRegions}
                selectedRegions={new Set()}
                onToggleRegion={handleToggle}
                totalCountries={100}
                filteredCount={100}
            />
        );

        // click a region button
        fireEvent.click(screen.getByRole('button', { name: 'East Asia & Pacific region toggle button' }));
        expect(handleToggle).toHaveBeenCalledWith('East Asia & Pacific');
    });
});
