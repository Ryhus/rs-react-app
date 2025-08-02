import { create } from 'zustand';

import type { Breed } from '@/Services/DogService/types';

interface SelectionStore {
  selected: Record<string, Breed>;
  toggleSelection: (breed: Breed) => void;
  clearSelection: () => void;
  isSelected: (id: string) => boolean;
  selectedList: () => Breed[];
}

export const useSelectionStore = create<SelectionStore>((set, get) => ({
  selected: {},

  toggleSelection: (breed) => {
    if (!breed.id) return;

    const id = breed.id as string;

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
