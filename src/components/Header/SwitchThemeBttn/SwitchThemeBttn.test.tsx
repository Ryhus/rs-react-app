import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, expect, it, type Mock } from 'vitest';
import * as contexts from '@/contexts';
import { SwitchThemeBttn } from './SwitchThemeBttn';

vi.mock('@/contexts', () => ({
  useTheme: vi.fn(),
}));

describe('SwitchThemeBttn', () => {
  it('displays 🌙 when theme is light', () => {
    const toggleThemeMock = vi.fn();
    (contexts.useTheme as Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: toggleThemeMock,
    });

    render(<SwitchThemeBttn />);
    expect(screen.getByText('🌙')).toBeInTheDocument();

    fireEvent.click(screen.getByText('🌙'));
    expect(toggleThemeMock).toHaveBeenCalled();
  });

  it('displays 🔆 when theme is dark', () => {
    const toggleThemeMock = vi.fn();
    (contexts.useTheme as Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: toggleThemeMock,
    });

    render(<SwitchThemeBttn />);
    expect(screen.getByText('🔆')).toBeInTheDocument();

    fireEvent.click(screen.getByText('🔆'));
    expect(toggleThemeMock).toHaveBeenCalled();
  });
});
