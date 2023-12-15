import { create } from 'zustand'

export const useLoading = create((set : any) => ({
  loading: false,
  setLoading: (loading: boolean) => set({loading: loading})
}))