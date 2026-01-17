import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as ReactRouterDom from 'react-router-dom';
import BreedDetails from './BreedDetails';

const mockBreed = {
  id: '1',
  name: 'Corgi',
  reference_image_id: 'abc123',
  breed_group: 'Herding',
  life_span: '12 - 14 years',
  temperament: 'Alert, Affectionate, Smart',
  weight: { metric: '10 - 12', imperial: '22 - 26' },
  height: { metric: '25 - 30', imperial: '10 - 12' },
};

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useLoaderData: vi.fn(),
  };
});

describe('BreedDetails', () => {
  beforeEach(() => {
    (
      ReactRouterDom.useLoaderData as unknown as ReturnType<typeof vi.fn>
    ).mockReset();
  });

  it('renders breed details when useLoaderData returns data', () => {
    (
      ReactRouterDom.useLoaderData as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue(mockBreed);

    render(<BreedDetails />);

    expect(screen.getByRole('heading', { name: /corgi/i })).toBeDefined();
    expect(screen.getByText(/herding/i)).toBeDefined();
    expect(screen.getByText(/12 - 14 years/i)).toBeDefined();
    expect(screen.getByText(/alert, affectionate, smart/i)).toBeDefined();
    expect(screen.getByText(/10 - 12 kg/i)).toBeDefined();
    expect(screen.getByText(/25 - 30 cm/i)).toBeDefined();

    const img = screen.getByRole('img', { name: /corgi/i });
    expect(img.getAttribute('src')).toContain(mockBreed.reference_image_id);
  });

  it('renders nothing if useLoaderData returns null', () => {
    (
      ReactRouterDom.useLoaderData as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue(null);

    render(<BreedDetails />);

    expect(screen.queryByRole('heading')).toBeNull();
  });
});
