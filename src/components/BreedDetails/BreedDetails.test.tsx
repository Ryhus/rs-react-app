import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as DogService from '../../Services/DogService/DogService';
import BreedDetails from './BreedDetails';

vi.mock('../../Services/DogService/DogService');
const mockedGetBreedById = DogService.getBreedById as ReturnType<typeof vi.fn>;

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useParams: () => ({ breedId: '1' }),
  };
});

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

describe('BreedDetails Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loader while fetching', async () => {
    mockedGetBreedById.mockImplementation(() => new Promise(() => {})); // never resolves

    render(
      <MemoryRouter>
        <BreedDetails />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader-wrapper')).toBeInTheDocument();
  });

  it('renders breed details after successful fetch', async () => {
    mockedGetBreedById.mockResolvedValueOnce(mockBreed);

    render(
      <MemoryRouter>
        <BreedDetails />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: /corgi/i })
      ).toBeInTheDocument()
    );

    expect(screen.getByText(/herding/i)).toBeInTheDocument();
    expect(screen.getByText(/12 - 14 years/i)).toBeInTheDocument();
    expect(screen.getByText(/alert, affectionate, smart/i)).toBeInTheDocument();
    expect(screen.getByText(/10 - 12 kg/i)).toBeInTheDocument();
    expect(screen.getByText(/25 - 30 cm/i)).toBeInTheDocument();
  });

  it('renders "Breed not found" if API returns null', async () => {
    mockedGetBreedById.mockResolvedValueOnce(null);

    render(
      <MemoryRouter>
        <BreedDetails />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/breed not found/i)).toBeInTheDocument()
    );
  });

  it('renders "Breed not found" on fetch error', async () => {
    mockedGetBreedById.mockRejectedValueOnce(new Error('API failed'));

    render(
      <MemoryRouter>
        <BreedDetails />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/breed not found/i)).toBeInTheDocument()
    );
  });
});
