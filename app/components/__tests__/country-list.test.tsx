import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CountryList from '@/app/components/country-list';

// some sample data for testing
const mockCountries = [
    { 
        id: 'USA', 
        name: 'United States',
        capitalCity: 'Washington D.C.',
        region: { value: 'North America' },
        incomeLevel: { value: 'High income' },
        lendingType: { value: 'IBRD' }
    },
    { 
        id: 'CAN', 
        name: 'Canada',
        capitalCity: 'Ottawa',
        region: { value: 'North America' },
        incomeLevel: { value: 'High income' },
        lendingType: { value: 'IBRD' }
    }
];

describe('CountryList', () => {
    // set up fetch mock before each test
    beforeEach(() => {
        global.fetch = jest.fn();
        (global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve([null, mockCountries])
        });
    });

    it('loads and shows countries', async () => {
        render(<CountryList />);

        // wait for countries to load
        await waitFor(() => {
            expect(screen.getByText('United States')).toBeInTheDocument();
            expect(screen.getByText('Canada')).toBeInTheDocument();
        });
    });

    it('shows error message when api fails', async () => {
        // mock console.error to avoid test noise
        console.error = jest.fn();
        
        // make the fetch fail
        (global.fetch as jest.Mock).mockRejectedValue(new Error('api error'));
        
        render(<CountryList />);

        // check for error message
        await waitFor(() => {
            expect(screen.getByText(/unable to load countries/i)).toBeInTheDocument();
        });
    });

    it('shows error message on initial load failure', async () => {
        (global.fetch as jest.Mock)
            .mockResolvedValueOnce({
                ok: false,
                status: 500
            });

        render(<CountryList />);

        await waitFor(() => {
            expect(screen.getByText(/unable to load countries/i)).toBeInTheDocument();
        });
    });

    it('shows error message when loading country details fails', async () => {
        console.error = jest.fn(); // mock console.error
        
        (global.fetch as jest.Mock)
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve([null, mockCountries])
            })
            .mockRejectedValueOnce(new Error('Failed to load details'));

        render(<CountryList />);

        await waitFor(() => {
            expect(screen.getByText('United States')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('United States'));

        await waitFor(() => {
            expect(screen.getByText(/unable to load country details/i)).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
        });

        // test that we can close the error modal
        fireEvent.click(screen.getByRole('button', { name: /close/i }));
        expect(screen.queryByText(/unable to load country details/i)).not.toBeInTheDocument();
    });

    it('shows error message when country details response is not ok', async () => {
        (global.fetch as jest.Mock)
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve([null, mockCountries])
            })
            .mockResolvedValueOnce({
                ok: false,
                status: 404
            });

        render(<CountryList />);

        // wait for initial render
        await waitFor(() => {
            expect(screen.getByText('United States')).toBeInTheDocument();
        });

        // click country to trigger details fetch
        fireEvent.click(screen.getByText('United States'));

        // wait for error modal
        const errorText = await screen.findByText('unable to load country details. please try again later.', {}, { timeout: 3000 });
        expect(errorText).toBeInTheDocument();
    });

    it('handles json parsing error in country details', async () => {
        (global.fetch as jest.Mock)
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve([null, mockCountries])
            })
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.reject(new Error('Invalid JSON'))
            });

        render(<CountryList />);

        // wait for initial render
        await waitFor(() => {
            expect(screen.getByText('United States')).toBeInTheDocument();
        });

        // click country to trigger details fetch
        fireEvent.click(screen.getByText('United States'));

        // wait for error modal
        const errorText = await screen.findByText('unable to load country details. please try again later.', {}, { timeout: 3000 });
        expect(errorText).toBeInTheDocument();
    });

    it('handles non-ok response from api', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 500
        });

        render(<CountryList />);
        
        await waitFor(() => {
            expect(screen.getByText(/unable to load countries/i)).toBeInTheDocument();
        });
    });
});
