import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import PopUpMessage from './PopUpMessage';

describe('PopUpMessage', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('renders the message', () => {
    const onClose = vi.fn();

    render(<PopUpMessage message="Test Message" onClose={onClose} />);

    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('calls onClose after 3 seconds', () => {
    const onClose = vi.fn();

    render(<PopUpMessage message="Test Message" onClose={onClose} />);

    vi.advanceTimersByTime(3000);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
