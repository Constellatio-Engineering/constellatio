import { gql } from "graphql-request";
import { f_Category } from '../fragments/f_Main_Category';

export const q_all_category = gql`
${f_Category}
query q_all_category {
  allMainCategory{totalCount
    edges{
      node{
       ...MainCategory
      }
    }
  }
}
`;