import { create } from 'zustand'

interface LoadingState {
  loading: boolean,
  setLoading: (loading: boolean) => void
}

export const useLoading = create<LoadingState>()((set) => ({
  loading: true,
  setLoading: (loading: boolean) => set({loading: loading})
}))