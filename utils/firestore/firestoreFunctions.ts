import firestore from '@react-native-firebase/firestore'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'


export const checkAndCreateFirestoreUser = async (user : FirebaseAuthTypes.User ) => {
  try {
    // if (!user.emailVerified) {
    //   auth().currentUser?.sendEmailVerification();
    // }
    if (!(await checkFirestoreForUser(user))){
      await createNewUserFirestore(user)
    }
  } catch (error) {
    console.log(error);
  }
}


export const checkFirestoreForUser =async (user : FirebaseAuthTypes.User) => {
  const document = await firestore()
  .collection('Users')
  .doc(user.uid)
  .get()

  return document.exists
}


export const createNewUserFirestore = async (user : FirebaseAuthTypes.User) => {
  await firestore()
    .collection('Users')
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      multiFactor: user.multiFactor?.enrolledFactors,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      providerId: user.providerId,
      authProvider: user.providerData[0].providerId,
      providerData: user.providerData[0],
      uid: user.uid,
      createdTime: user.metadata.creationTime,
      lastSignInTime: user.metadata.lastSignInTime,
      lastUpdatedTime: firestore.FieldValue.serverTimestamp(),
      bookmarkedStrategies: [],
    })
    .then(() => {
      console.log('User added!');
    });
}