import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { create } from 'zustand'
import { FirestoreDocument } from '@utils/types/types';

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
  posts: FirestoreDocument[];
}

interface UserFeedActions {
  setInputValue: (text: string) => void;
  setPosts: (newPosts: FirestoreDocument[]) => void;
  deletePost: (post_id: string) => void;
}

export const useUserFeedStore = create<UserFeedState & UserFeedActions>((set) => ({
  inputValue: '',
  posts: [],
  setInputValue: (text) => set((state) => ({ inputValue: text })),
  setPosts: (newPosts) => set((state) => ({ posts: newPosts })),
  deletePost: (post_id) => set((state) => ({
    posts: state.posts.filter((post)=> post.post_id !== post_id),
  }))
}));