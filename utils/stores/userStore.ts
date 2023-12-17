import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { create } from 'zustand'

interface UserState {
  user: FirebaseAuthTypes.User | null,
  setUser: (newUser: FirebaseAuthTypes.User | null) => void,
}

export const userStore = create<UserState>()((set) => ({
  user: null,
  setUser: (newUser: FirebaseAuthTypes.User | null) => set({user: newUser})
}))