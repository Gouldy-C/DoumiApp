import { create } from 'zustand'


interface SearchState {
  search: string[] ,
  setSearch: (newSearch: string[]) => void,
  resetSearch: () => void,
}

export const searchStore = create<SearchState>()((set) => ({
  search: [],
  setSearch: (newSearch: string[]) => set({search: newSearch}),
  resetSearch: () => set({search: []}),
}))
