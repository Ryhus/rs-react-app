import { describe, it, expect, beforeEach } from 'vitest';
import { useSelectionStore } from '@/stores/selectionStore';
import { act } from 'react-dom/test-utils';

import { type BreedInfo } from '@/Services/DogService/types';

const breed1: BreedInfo = {
  id: 1,
  name: 'Breed One',
  origin: 'USA',
  bred_for: 'Herding',
  life_span: '10 years',
  weight: { imperial: '50', metric: '22' },
  height: { imperial: '20', metric: '50' },
};

const breed2: BreedInfo = {
  id: 2,
  name: 'Breed Two',
  origin: 'Germany',
  bred_for: 'Hunting',
  life_span: '12 years',
  weight: { imperial: '60', metric: '27' },
  height: { imperial: '24', metric: '61' },
};

describe('useSelectionStore', () => {
  beforeEach(() => {
    useSelectionStore.getState().clearSelection();
  });

  it('initially has empty selection', () => {
    const selected = useSelectionStore.getState().selectedList();
    expect(selected).toEqual([]);
  });

  it('toggles a breed in and out of selection', () => {
    act(() => {
      useSelectionStore.getState().toggleSelection(breed1);
    });

    let state = useSelectionStore.getState();
    expect(state.selectedList()).toHaveLength(1);
    expect(state.isSelected(breed1.id)).toBe(true);

    act(() => {
      state.toggleSelection(breed1);
    });

    state = useSelectionStore.getState();
    expect(state.selectedList()).toHaveLength(0);
    expect(state.isSelected(breed1.id)).toBe(false);
  });

  it('adds multiple breeds to selection', () => {
    act(() => {
      useSelectionStore.getState().toggleSelection(breed1);
      useSelectionStore.getState().toggleSelection(breed2);
    });

    const state = useSelectionStore.getState();
    expect(state.selectedList()).toHaveLength(2);
    expect(state.isSelected(breed1.id)).toBe(true);
    expect(state.isSelected(breed2.id)).toBe(true);
  });

  it('clears the selection', () => {
    act(() => {
      useSelectionStore.getState().toggleSelection(breed1);
      useSelectionStore.getState().toggleSelection(breed2);
    });

    act(() => {
      useSelectionStore.getState().clearSelection();
    });

    const state = useSelectionStore.getState();
    expect(state.selectedList()).toEqual([]);
    expect(state.isSelected(breed1.id)).toBe(false);
    expect(state.isSelected(breed2.id)).toBe(false);
  });
});
