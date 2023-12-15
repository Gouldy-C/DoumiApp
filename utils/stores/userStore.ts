import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { create } from 'zustand'

export const userStore = create((set : any) => ({
  user: null,
  setUser: (newUser: FirebaseAuthTypes.User | null) => set({user: newUser})
}))