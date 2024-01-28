import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { ImageSourcePropType } from "react-native";


export interface GoogleUser {
  idToken: string,
  serverAuthCode: string,
  scopes: Array<string>
  user: {
    email: string,
    id: string,
    givenName: string | null,
    familyName: string | null,
    photo: string | null, // url
    name: string | null // full name
  }
}

export interface FirestorePost {
  content: string;
  uid: string;
  timestamp: any;
  post_id: string;
  displayName: string;
  likedArray: string[];
  photoURL: string;
  bookmarkedPosts: string[],
  updated: boolean,
  updatedTimestamp: null | any,
  hashTags: string[],
}

export interface FirestoreComment {
  comment: string;
  uid: string;
  timestamp: any;
  post_id: string;
  displayName: string;
  likedArray: string[];
  comment_id: string;
  photoURL: string 
}


export interface Strategy {
  title: string;
  description: string;
  categories: string[];
  strategyId: string;
  image: ImageSourcePropType
}


export interface UserDoc {
  displayName: string | null,
  email: string | null,
  emailVerified: boolean,
  phoneNumber: string | null,
  photoURL: string | null,
  providerId: string,
  authProvider: string,
  uid: string,
  createdTime: any,
  lastSignInTime: any,
  lastUpdatedTime: FirebaseFirestoreTypes.FieldValue,
  bookmarkedStrategies: string[],
  bookmarkedPosts: string[],
}