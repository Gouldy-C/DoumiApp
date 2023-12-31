import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { create } from 'zustand'
import FirestoreDocument from '@app/(user)/CommunityFeed/feed'

// Auth Store 

interface UserState {
  user: FirebaseAuthTypes.User | null,
  setUser: (newUser: FirebaseAuthTypes.User | null) => void,
}

export const userStore = create<UserState>()((set) => ({
  user: null,
  setUser: (newUser: FirebaseAuthTypes.User | null) => set({user: newUser})
}))


// Feed Store 

interface UserFeedState {
  inputValue: string;
  posts: [];
}

interface UserFeedActions {
  setInputValue: (text: string) => void;
  setPosts: (newPosts: []) => void;
}

export const useUserFeedStore = create<UserFeedState & UserFeedActions>((set) => ({
  inputValue: '',
  posts: [],
  setInputValue: (text) => set((state) => ({ inputValue: text })),
  setPosts: (newPosts) => set((state) => ({ posts: newPosts })),
}));