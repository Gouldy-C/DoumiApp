import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { FirestorePost } from "./types/types";


// export const filterPosts = (
//     catIndex: number | 'Bookmarked',
//     usersBookmarkedPosts: string[]
//   ): FirestorePost[] => {
//     const cat = catIndex !== 'Bookmarked' ? strategyCatagories[catIndex].title : catIndex
//     if (cat === "All Strategies") {
//       return Posts;
//     } else if (cat === "Bookmarked") {
//       return strategies.filter((strategy) =>
//         usersBookmarkedPosts.includes(strategy.strategyId)
//       );
//     } else {
//       return strategies.filter((strategy) => strategy.categories.includes(cat));
//     }
//   };


export const bookmarkPost = async (post_id: string) => {
    const userId = auth().currentUser?.uid;
    const usersRef = firestore().collection("Users");
  
    try {
      const userDocRef = usersRef.doc(userId);
      const userDocSnapshot = await userDocRef.get();
      const data = userDocSnapshot.data();
  
      if (userDocSnapshot && data) {
        if (data.bookmarkedPosts.includes(post_id)) {
          await userDocRef.update({
            bookmarkedPosts: firestore.FieldValue.arrayRemove(post_id),
          })
        } else {
          await userDocRef.update({
            bookmarkedPosts: firestore.FieldValue.arrayUnion(post_id),
          });
          return;
        }
      } else {
        console.log(`Document with userId ${userId} does not exist`);
      }
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };