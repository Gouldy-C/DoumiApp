import { strategies } from "@constants/strategiesData/strategiesData";
import { Strategy } from "./types/types";
import { strategyCatagories } from "@constants/strategiesData/strategyCatagories";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { userStore } from "./stores/userStore";

// const currentUser = auth().currentUser
// const usersRef = firestore().collection('Users');

export const filterStrategies = (
  catIndex: number | 'Bookmarked'
): Strategy[] => {
  const cat = catIndex !== 'Bookmarked' ? strategyCatagories[catIndex].title : catIndex
  if (cat === "All Strategies") {
    return strategies;
  } else if (cat === "Bookmarked") {
    const usersBookmarkedStrategies = userStore((state) => state.userDoc?.bookmarkedStrategies)
    return strategies.filter((strategy) =>
      usersBookmarkedStrategies!.includes(strategy.strategyId)
    );
  } else {
    return strategies.filter((strategy) => strategy.categories.includes(cat));
  }
};

export const bookmarkStrategy = async (strategy_id: string) => {
  const userId = auth().currentUser?.uid;
  const usersRef = firestore().collection("Users");

  try {
    const userDocRef = usersRef.doc(userId);
    const userDocSnapshot = await userDocRef.get();
    const data = userDocSnapshot.data();

    if (userDocSnapshot && data) {
      if (data.bookmarkedStrategies.includes(strategy_id)) {
        await userDocRef.update({
          bookmarkedStrategies: firestore.FieldValue.arrayRemove(strategy_id),
        })
      } else {
        await userDocRef.update({
          bookmarkedStrategies: firestore.FieldValue.arrayUnion(strategy_id),
        });
        return;
      }
    } else {
      console.error(`Document with userId ${userId} does not exist`);
    }
  } catch (error) {
    console.error("Error adding like:", error);
  }
};
