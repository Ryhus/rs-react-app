import { describe, it, vi, beforeEach, expect, type Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Flyout from './Flyout';
import * as store from '@/stores/selectionStore';
import * as fileSaver from 'file-saver';
import * as csvUtil from '@/utils/csv';

const mockClearSelection = vi.fn();

const mockBreeds = [
  {
    id: '1',
    name: 'Corgi',
    origin: 'Wales',
    bred_for: 'Herding',
    life_span: '12 - 14 years',
  },
  {
    id: '2',
    name: 'Beagle',
    origin: 'England',
    bred_for: 'Hunting',
    life_span: '13 - 15 years',
  },
];

vi.mock('@/stores/selectionStore', () => ({
  useSelectionStore: vi.fn(),
}));

vi.mock('file-saver', () => ({
  saveAs: vi.fn(),
}));

vi.mock('@/utils/csv', () => ({
  createCSVContent: vi.fn(),
}));

describe('Flyout Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing if selectedList is empty', () => {
    (store.useSelectionStore as unknown as Mock).mockReturnValue({
      selectedList: () => [],
      clearSelection: mockClearSelection,
    });

    const { container } = render(<Flyout />);
    expect(container.firstChild).toBeNull();
  });

  it('renders flyout with correct count and buttons', () => {
    (store.useSelectionStore as unknown as Mock).mockReturnValue({
      selectedList: () => mockBreeds,
      clearSelection: mockClearSelection,
    });

    render(<Flyout />);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /unselect all/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /download/i })
    ).toBeInTheDocument();
  });

  it('calls clearSelection when "Unselect all" is clicked', () => {
    (store.useSelectionStore as unknown as Mock).mockReturnValue({
      selectedList: () => mockBreeds,
      clearSelection: mockClearSelection,
    });

    render(<Flyout />);
    fireEvent.click(screen.getByRole('button', { name: /unselect all/i }));
    expect(mockClearSelection).toHaveBeenCalledTimes(1);
  });

  it('downloads CSV when "Download" is clicked', () => {
    const mockCSV = 'csv,data,string';
    const mockCreateCSVContent = csvUtil.createCSVContent as unknown as Mock;
    const mockSaveAs = fileSaver.saveAs as unknown as Mock;

    mockCreateCSVContent.mockReturnValue(mockCSV);

    (store.useSelectionStore as unknown as Mock).mockReturnValue({
      selectedList: () => mockBreeds,
      clearSelection: mockClearSelection,
    });

    render(<Flyout />);
    fireEvent.click(screen.getByRole('button', { name: /download/i }));

    expect(mockCreateCSVContent).toHaveBeenCalledWith([
      ['Name', 'Origin', 'Bredd_for', 'Life_span', 'URL'],
      [
        'Corgi',
        'Wales',
        'Herding',
        '12 - 14 years',
        'https://beloved-dogs.netlify.app/?details=1',
      ],
      [
        'Beagle',
        'England',
        'Hunting',
        '13 - 15 years',
        'https://beloved-dogs.netlify.app/?details=2',
      ],
    ]);

    expect(mockSaveAs).toHaveBeenCalled();
    expect(mockSaveAs.mock.calls[0][1]).toBe('2_items.csv');
  });
});
