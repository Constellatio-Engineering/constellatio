import { f_SubCategory } from "@/services/graphql/fragments/SubCategroy";

import { gql } from "graphql-request";

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
