import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home', () => {
    beforeEach(() => {
        render(<Home />);
    });

    it('should have Docs text', () => {
        const docsElement = screen.getByText('Docs');
        expect(docsElement).toBeInTheDocument();
    });

    it('should contain the text "information"', () => {
        const infoElement = screen.getByText(/information/i);
        expect(infoElement).toBeInTheDocument();
    });

    it('should have a heading with "Learn ->"', () => {
        const headingElement = screen.getByRole('heading', { name: 'Learn ->' });
        expect(headingElement).toBeInTheDocument();
    });
});
