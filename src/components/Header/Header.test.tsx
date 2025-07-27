import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Header from './Header';

describe('Header Component', () => {
  it('renders logo and navigation links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('🐶 BelovedDogs')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  it('logo navigates to home page', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logoLink = screen.getByRole('link', { name: /beloveddogs/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('Home and About links navigate to correct paths', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });

    expect(homeLink).toHaveAttribute('href', '/');
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('navigates when About link is clicked', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );

    const aboutLink = screen.getByRole('link', { name: /about/i });
    await user.click(aboutLink);

    expect(aboutLink).toHaveAttribute('href', '/about');
  });
});
