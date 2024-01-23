import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { UserDoc } from '@utils/types/types'
import { create } from 'zustand'


interface LoginInfo {
  email: string | null
  username: string | null
  profilePic: string | null
}

interface UserState {
  authUser: FirebaseAuthTypes.User | null,
  setAuthUser: (newUser: FirebaseAuthTypes.User | null) => void,
  userDoc: UserDoc | null,
  setUserDoc: (newUserDoc: UserDoc | null) => void,
  loginInfo: LoginInfo,
  setLoginEmail: (newEmail: string) => void,
  setUsername: (newUsername: string) => void,
  setProfilePic: (picUrl: string) => void,
  resetLoginInfo: () => void,
}

export const userStore = create<UserState>()((set) => ({
  authUser: null,
  setAuthUser: (newUser: FirebaseAuthTypes.User | null) => set({authUser: newUser}),
  userDoc: null,
  setUserDoc: (newUserDoc: UserDoc | null) => set({userDoc: newUserDoc}),
  loginInfo: {
    email:  null,
    username:  null,
    profilePic:  null,
  },
  setLoginEmail: (newEmail: string) => set((state) => ({loginInfo : {...state.loginInfo, email: newEmail}})),
  setUsername: (newUsername: string) => set((state) => ({loginInfo : {...state.loginInfo, username: newUsername}})),
  setProfilePic: (picUrl: string) => set((state) => ({loginInfo : {...state.loginInfo, profilePic: picUrl}})),
  resetLoginInfo: () => set({loginInfo: {
    email:  null,
    username:  null,
    profilePic:  null,
  }}),
}))

