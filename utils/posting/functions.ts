import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';



// DELETE A POST ****************************************************
export const handleDelete = async (documentId:string) => {
  try {
    // Delete the entire document based on the document ID
    await firestore().collection('Posts').doc(documentId).delete();

  } catch (error) {
    console.error('Error deleting post:', error);
  }
};

