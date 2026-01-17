import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import Header from './Header';

vi.mock('./SwitchThemeBttn/SwitchThemeBttn', () => ({
  SwitchThemeBttn: () => <button aria-label="Toggle Theme">🌗</button>,
}));

describe('Header Component', () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  const renderWithRouter = (initialRoute: string = '/'): void => {
    render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="*" element={<Header />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders logo and navigation links', (): void => {
    renderWithRouter();

    const logo = screen.getByText('🐶 BelovedDogs');
    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const themeButton = screen.getByRole('button', { name: /toggle theme/i });

    expect(logo).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(themeButton).toBeInTheDocument();
  });

  it('logo navigates to home page', (): void => {
    renderWithRouter();

    const logoLink: HTMLAnchorElement = screen.getByRole('link', {
      name: /beloveddogs/i,
    });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('Home and About links navigate to correct paths', (): void => {
    renderWithRouter();

    const homeLink: HTMLAnchorElement = screen.getByRole('link', {
      name: /home/i,
    });
    const aboutLink: HTMLAnchorElement = screen.getByRole('link', {
      name: /about/i,
    });

    expect(homeLink).toHaveAttribute('href', '/');
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('navigates when About link is clicked', async (): Promise<void> => {
    renderWithRouter();

    const aboutLink: HTMLAnchorElement = screen.getByRole('link', {
      name: /about/i,
    });
    await user.click(aboutLink);

    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('theme button is clickable', async (): Promise<void> => {
    renderWithRouter();

    const themeButton: HTMLButtonElement = screen.getByRole('button', {
      name: /toggle theme/i,
    });
    await user.click(themeButton);

    expect(themeButton).toBeInTheDocument();
  });
});
