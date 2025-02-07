import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../card';

// sample country data for testing
const mockCountry = {
    id: 'USA',
    name: 'United States',
    capitalCity: 'Washington D.C.',
    region: { value: 'North America' },
    incomeLevel: { value: 'High income' },
    lendingType: { value: 'IBRD' }
};

describe('Card', () => {
    // mock the click handler
    const handleClick = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('shows country info correctly', () => {
        render(<Card country={mockCountry} index={0} onClick={handleClick} />);
        
        // check if basic info is displayed
        expect(screen.getByText('United States')).toBeInTheDocument();
        expect(screen.getByText('Washington D.C.')).toBeInTheDocument();
        expect(screen.getByText('North America')).toBeInTheDocument();
    });

    it('calls click handler when clicked', () => {
        render(<Card country={mockCountry} index={0} onClick={handleClick} />);
        
        // find the clickable card element
        const card = screen.getByText('United States').closest('div')!;
        fireEvent.click(card);
        
        // check if click handler was called
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
