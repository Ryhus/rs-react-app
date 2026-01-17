import { create } from 'zustand';

import type { BreedInfo } from '@/Services/DogService/types';

interface SelectionStore {
  selected: Record<string, BreedInfo>;
  toggleSelection: (breed: BreedInfo) => void;
  clearSelection: () => void;
  isSelected: (id: number) => boolean;
  selectedList: () => BreedInfo[];
}

export const useSelectionStore = create<SelectionStore>((set, get) => ({
  selected: {},

  toggleSelection: (breed) => {
    if (!breed.id) return;

    const id = breed.id;

    set((state) => {
      const newSelected = { ...state.selected };
      if (newSelected[id]) {
        delete newSelected[id];
      } else {
        newSelected[id] = breed;
      }
      return { selected: newSelected };
    });
  },

  clearSelection: () => set({ selected: {} }),
  isSelected: (id) => !!get().selected[id],
  selectedList: () => Object.values(get().selected),
}));
