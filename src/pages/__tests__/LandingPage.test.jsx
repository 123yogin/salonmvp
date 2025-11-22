import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from '../../pages/LandingPage';

describe('LandingPage component', () => {
    test('renders without crashing', () => {
        render(
            <MemoryRouter>
                <LandingPage />
            </MemoryRouter>
        );
        const title = screen.getByRole('heading', { name: /Premium Unisex Salon & Grooming Experience/i });
        expect(title).toBeInTheDocument();
    });

    test('has Explore Services link', () => {
        render(
            <MemoryRouter>
                <LandingPage />
            </MemoryRouter>
        );
        const exploreLink = screen.getByRole('link', { name: /Explore Services/i });
        expect(exploreLink).toBeInTheDocument();
        expect(exploreLink).toHaveAttribute('href', '#services');
    });

    test('matches snapshot', () => {
        const { asFragment } = render(
            <MemoryRouter>
                <LandingPage />
            </MemoryRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
