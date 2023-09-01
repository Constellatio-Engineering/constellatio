import { gql } from "graphql-request";

import { f_Category } from "../fragments/f_Main_Category";

export const q_all_subcategory = gql`
${f_Category}
query q_all_subcategory {
  allSubCategory{
    totalCount
    edges{
      node{
        id
        subCategory
        mainCategory{
          ...MainCategory
        }
      }
    }
  }
}

`;
