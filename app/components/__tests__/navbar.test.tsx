import { render, screen } from '@testing-library/react';
import { Navbar } from '../navbar';

describe('Navbar', () => {
    it('shows app title and tagline', () => {
        render(<Navbar />);

        // check main title
        expect(screen.getByText('Capital Quest')).toBeInTheDocument();
        
        // check tagline
        expect(screen.getByText('"Explore the world, one capital at a time"')).toBeInTheDocument();
    });

    it('has github link', () => {
        render(<Navbar />);

        // check github link
        const githubLink = screen.getByRole('link', { name: /github/i });
        expect(githubLink).toHaveAttribute('href', 'https://github.com/cbarrett3/capital-quest');
        expect(githubLink).toHaveAttribute('target', '_blank');
    });
});
