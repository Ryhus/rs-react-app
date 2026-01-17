import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as ReactRouterDom from 'react-router-dom';
import * as DogQueries from '@/hooks/queries/dogQueries';
import BreedDetails from './BreedDetails';

const mockBreed = {
  id: '1',
  name: 'Corgi',
  reference_image_id: 'abc123',
  bred_for: 'Herding livestock',
  breed_group: 'Herding',
  life_span: '12 - 14 years',
  temperament: 'Alert, Affectionate, Smart',
  weight: { metric: '10 - 12', imperial: '22 - 26' },
  height: { metric: '25 - 30', imperial: '10 - 12' },
  image: { url: 'https://cdn.thedogapi.com/images/abc123.jpg' },
};

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

vi.mock('@/hooks/queries/dogQueries', () => ({
  useBreedDetails: vi.fn(),
}));

describe('BreedDetails', () => {
  beforeEach(() => {
    (
      ReactRouterDom.useSearchParams as unknown as ReturnType<typeof vi.fn>
    ).mockReset();
    (
      DogQueries.useBreedDetails as unknown as ReturnType<typeof vi.fn>
    ).mockReset();

    (
      ReactRouterDom.useSearchParams as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue([new URLSearchParams({ details: mockBreed.id })]);
  });

  it('renders breed details when data is available', () => {
    (
      DogQueries.useBreedDetails as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: mockBreed,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<BreedDetails />);

    expect(screen.getByRole('heading', { name: /corgi/i })).toBeDefined();
    expect(screen.getByText(/herding livestock/i)).toBeDefined();
    expect(screen.getByText(/12 - 14 years/i)).toBeDefined();
    expect(screen.getByText(/alert, affectionate, smart/i)).toBeDefined();
    expect(screen.getByText(/10 - 12 kg/i)).toBeDefined();
    expect(screen.getByText(/25 - 30 cm/i)).toBeDefined();

    const img = screen.getByRole('img', { name: /corgi/i });
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toBe(mockBreed.image.url);
  });

  it('renders "Breed not found" if no breed data', () => {
    (
      DogQueries.useBreedDetails as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<BreedDetails />);

    expect(screen.getByText(/breed not found/i)).toBeDefined();
  });

  it('renders loader when loading', () => {
    (
      DogQueries.useBreedDetails as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<BreedDetails />);

    expect(screen.getByTestId('loader-wrapper')).toBeDefined();
  });

  it('renders error component when error occurs', () => {
    const error = new Error('Something went wrong');

    (
      DogQueries.useBreedDetails as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error,
      refetch: vi.fn(),
    });

    render(<BreedDetails />);
    expect(screen.getAllByText(/something went wrong/i).length).toBeGreaterThan(
      0
    );
  });
});
