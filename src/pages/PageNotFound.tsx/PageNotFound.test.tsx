import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PageNotFound from './PageNotFound';
import { describe, it, expect } from 'vitest';

describe('PageNotFound Component', () => {
  it('renders 404 heading', () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
  });

  it('renders dog not found message', () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', { name: /uh-oh! dog not found/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/the page you are sniffing for does not exist/i)
    ).toBeInTheDocument();
  });

  it('renders home link with correct href', () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /go home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('includes image placeholder div', () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>
    );
    const imgDiv = screen.getByTestId('not-found-img');
    expect(imgDiv).toHaveClass('not-found-img');
  });
});
