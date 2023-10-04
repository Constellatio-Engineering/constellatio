// get all cases by main category
import { gql } from "graphql-request";

import { f_FullCase } from "../fragments/FullCase";

export const getAllCasesByMainCategory = gql`
  ${f_FullCase}
  query getAllCasesByMainCategory($mainCategory: String!) {
    allCase(
      where: {
        AND: [
          {
            mainCategoryField: {
              findOne: { MainCategory: { mainCategory: { eq: $mainCategory } } }
            }
          }
        ]
      }
    ) {
        totalCount
      edges {
        node {
          ...FullCase
        }
      }
    }
  }
`;
