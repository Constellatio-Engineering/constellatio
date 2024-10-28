import { gql } from "graphql-request";
import { f_SubCategory } from "../fragments/SubCategroy";

export const q_allSubCategory = gql`
  ${f_SubCategory}
  query getAllSubCategory {
    allSubCategory {
      totalCount
      edges {
        node {
          ...SubCategory
        }
      }
    }
  }
`;
