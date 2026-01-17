import { render, screen } from '@testing-library/react';
import About from './About';
import { describe, it, expect } from 'vitest';

describe('About Component', () => {
  it('renders author photo with correct alt text', () => {
    render(<About />);
    const img = screen.getByAltText(/author photo/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'photos/me.jpeg');
  });

  it('displays author name', () => {
    render(<About />);
    expect(
      screen.getByRole('heading', { name: /yevhen ryhus/i })
    ).toBeInTheDocument();
  });

  it('highlights key phrases', () => {
    render(<About />);
    const highlights = screen.getAllByText(
      (_, element) => element?.classList.contains('about-highlight') ?? false
    );
    const highlightTexts = highlights.map((el) => el.textContent);
    expect(highlightTexts).toEqual(
      expect.arrayContaining([
        'Data Scientist',
        'Software Engineer',
        'Machine Learning',
        'Quantitative Finance',
      ])
    );
  });

  it('renders RS School logo with link and text', () => {
    render(<About />);
    const logo = screen.getByAltText(/rs school logo/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logos/rs-school-logo.svg');

    const link = screen.getByRole('link', { name: /rs school logo/i });
    expect(link).toHaveAttribute('href', 'https://rs.school/');

    expect(screen.getByText(/powered by rs school/i)).toBeInTheDocument();
  });
});
