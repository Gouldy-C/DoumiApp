import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { UserDoc } from '@utils/types/types'
import { create } from 'zustand'


interface UserState {
  user: FirebaseAuthTypes.User | null,
  userDoc: UserDoc | null,
  setUser: (newUser: FirebaseAuthTypes.User | null) => void,
  setUserDoc: (newUserDoc: UserDoc | null) => void,
}

export const userStore = create<UserState>()((set) => ({
  user: null,
  userDoc: null,
  setUser: (newUser: FirebaseAuthTypes.User | null) => set({user: newUser}),
  setUserDoc: (newUserDoc: UserDoc | null) => set({userDoc: newUserDoc})
}))

