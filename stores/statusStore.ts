import { create } from 'zustand'

export const useStatus = create((set : any) => ({
  drawerOpen: false,
  setDrawerOpen: (open: boolean) => set({drawerOpen: open})
}))