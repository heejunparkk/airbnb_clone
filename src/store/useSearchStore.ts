import { create } from 'zustand';

type SearchMode = 'stays' | 'experiences';

interface SearchState {
  searchMode: SearchMode;
  setSearchMode: (mode: SearchMode) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchMode: 'stays',
  setSearchMode: (mode) => set({ searchMode: mode }),
}));
