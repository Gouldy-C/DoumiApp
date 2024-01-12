import { strategies } from "@constants/strategiesData"
import { Strategy } from "./types/types"
import { strategyCatagories } from "@constants/strategiesData";


export const filterStrategies = (catIndex: number): Strategy[] => {
  const cat = strategyCatagories[catIndex].title
  if (cat === 'All Strategies'){
    return strategies
  }
  // else if (cat === 'Bookmarked'){
  //   return(
  //     <Text>Bookmarked</Text>
  //   )
  // }
  else {
    return (
      strategies
        .filter((strategy) => strategy.categories.includes(cat))
    )
  }
}