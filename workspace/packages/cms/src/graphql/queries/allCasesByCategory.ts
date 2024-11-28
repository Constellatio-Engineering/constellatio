import { gql } from "graphql-request";

export const getAllCasesByCategoryDetails = gql`
  query getAllCasesByCategoryDetails($legalAreaName: String!, $mainCategory: String!) {
    allCase(
      where: {
        legalArea: {
          findOne: { LegalArea: { legalAreaName: { eq: $legalAreaName } } }
        }
        mainCategoryField: {
          findOne: { MainCategory: { mainCategory: { eq: $mainCategory } } }
        }
      }
    ) {
      edges {
        node {
          id
        }
      }
      totalCount
    }
  }
`;
