import firestore from '@react-native-firebase/firestore'
import {FirebaseAuthTypes} from '@react-native-firebase/auth'



export const checkFirestoreForUser =async (user : FirebaseAuthTypes.User) => {
  const documentSnapshot = await firestore()
  .collection('Users')
  .doc(user.uid)
  .get()
    return documentSnapshot.exists

}


export const createNewUserFirestore = async (user : FirebaseAuthTypes.User) => {
  await firestore()
    .collection('Users')
    .doc(user.uid)
    .set({
      user
    })
    .then(() => {
      console.log('User added!');
    });
}