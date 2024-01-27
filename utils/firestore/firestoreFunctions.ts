import firestore from '@react-native-firebase/firestore'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'


export const checkForNewUser =async (user : FirebaseAuthTypes.User) => {
  const document = await firestore()
  .collection('Users')
  .doc(user.uid)
  .get()

  return !document.exists
}


export const createNewUserFirestore = async (user : FirebaseAuthTypes.User, displayName: string, profileUrl: string) => {
  await firestore()
    .collection('Users')
    .doc(user.uid)
    .set({
      displayName: displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      multiFactor: user.multiFactor?.enrolledFactors,
      phoneNumber: user.phoneNumber,
      photoURL: profileUrl,
      providerId: user.providerId,
      authProvider: user.providerData[0].providerId,
      providerData: user.providerData[0],
      uid: user.uid,
      createdTime: user.metadata.creationTime,
      lastSignInTime: user.metadata.lastSignInTime,
      lastUpdatedTime: firestore.FieldValue.serverTimestamp(),
      bookmarkedStrategies: [],
      bookmarkedPosts: []
    })
}