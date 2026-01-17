import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ThemeProvider } from './ThemeProvider';
import useTheme from './useTheme';

function TestComponent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <span>Current theme: {theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

function renderWithTheme() {
  return render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>
  );
}

describe('useTheme hook and ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders with default theme if none in localStorage', () => {
    renderWithTheme();

    expect(screen.getByText(/Current theme: light/i)).toBeDefined();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('renders with theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');

    renderWithTheme();

    expect(screen.getByText(/Current theme: dark/i)).toBeDefined();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('toggles theme on button click', () => {
    renderWithTheme();

    const button = screen.getByText(/Toggle Theme/i);
    fireEvent.click(button);

    expect(screen.getByText(/Current theme: dark/i)).toBeDefined();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');

    fireEvent.click(button);

    expect(screen.getByText(/Current theme: light/i)).toBeDefined();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('useTheme throws if used outside ThemeProvider', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    function ComponentUsingHook() {
      useTheme();
      return <div />;
    }

    expect(() => render(<ComponentUsingHook />)).toThrow(
      'useTheme must be used within ThemeProvider'
    );

    consoleErrorSpy.mockRestore();
  });
});
