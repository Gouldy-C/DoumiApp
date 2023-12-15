import { create } from 'zustand'

export const userStore = create((set : any) => ({
  user: null,
  setUser: (newUser: any) => set({user: newUser})
}))