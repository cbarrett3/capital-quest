import { render, screen, fireEvent } from '@testing-library/react';
import CountryModal from '../country-modal';

// sample data for testing
const mockCountry = {
    id: 'USA',
    name: 'United States',
    capitalCity: 'Washington D.C.',
    region: { value: 'North America' },
    incomeLevel: { value: 'High income' },
    lendingType: { value: 'IBRD' }
};

describe('CountryModal', () => {
    // mock the handlers
    const handleClose = jest.fn();
    const handleNext = jest.fn();
    const handlePrevious = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('shows country details when open', () => {
        render(
            <CountryModal
                country={mockCountry}
                onClose={handleClose}
                onNext={handleNext}
                onPrevious={handlePrevious}
                hasNext={true}
                hasPrevious={true}
            />
        );

        // check if details are shown
        expect(screen.getByText('United States')).toBeInTheDocument();
        const modalDescription = screen.getByRole('dialog').querySelector('#modal-description');
        expect(modalDescription).toHaveTextContent('Capital: Washington D.C.');
        expect(screen.getByText('North America')).toBeInTheDocument();
        expect(screen.getByText('High income')).toBeInTheDocument();
        expect(screen.getByText('IBRD')).toBeInTheDocument();
        expect(screen.getByText('USA')).toBeInTheDocument();
    });

    it('closes when close button is clicked', () => {
        render(
            <CountryModal
                country={mockCountry}
                onClose={handleClose}
                onNext={handleNext}
                onPrevious={handlePrevious}
                hasNext={true}
                hasPrevious={true}
            />
        );

        // click close button
        fireEvent.click(screen.getByRole('button', { name: /close/i }));
        expect(handleClose).toHaveBeenCalled();
    });

    it('shows navigation buttons when available', () => {
        render(
            <CountryModal
                country={mockCountry}
                onClose={handleClose}
                onNext={handleNext}
                onPrevious={handlePrevious}
                hasNext={true}
                hasPrevious={true}
            />
        );

        // check if navigation buttons are present
        const prevButton = screen.getByRole('button', { name: 'View previous country' });
        const nextButton = screen.getByRole('button', { name: 'View next country' });
        
        expect(prevButton).toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();
        
        // check if buttons work
        fireEvent.click(prevButton);
        expect(handlePrevious).toHaveBeenCalledTimes(1);
        
        fireEvent.click(nextButton);
        expect(handleNext).toHaveBeenCalledTimes(1);
    });

    it('hides navigation buttons when unavailable', () => {
        render(
            <CountryModal
                country={mockCountry}
                onClose={handleClose}
                onNext={handleNext}
                onPrevious={handlePrevious}
                hasNext={false}
                hasPrevious={false}
            />
        );

        // check if navigation buttons are hidden
        expect(screen.queryByRole('button', { name: 'View previous country' })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'View next country' })).not.toBeInTheDocument();
    });

    it('handles navigation buttons', () => {
        render(
            <CountryModal
                country={mockCountry}
                onClose={handleClose}
                onNext={handleNext}
                onPrevious={handlePrevious}
                hasNext={true}
                hasPrevious={true}
            />
        );

        // test navigation
        fireEvent.click(screen.getByRole('button', { name: 'View next country' }));
        expect(handleNext).toHaveBeenCalled();

        fireEvent.click(screen.getByRole('button', { name: 'View previous country' }));
        expect(handlePrevious).toHaveBeenCalled();
    });
});
