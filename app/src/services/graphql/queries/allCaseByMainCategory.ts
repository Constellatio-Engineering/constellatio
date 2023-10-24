import { gql } from "graphql-request";

export const getAllCasesByMainCategory = gql`
  query getAllCasesByMainCategory($mainCategoryName: String!) {
    allCase(
      where: {
        AND: [
          {
            mainCategoryField: {
              findOne: { MainCategory: { mainCategory: { eq: $mainCategoryName } } }
            }
          }
        ]
      }
    ) {
      totalCount
      edges {
        node {
          id
        }
      }
    }
  }
`;
