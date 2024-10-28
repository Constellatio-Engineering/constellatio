import { gql } from "graphql-request";

export const getAllArticlesByLegalArea = gql`
  query getAllArticlesByLegalArea($legalAreaName: String!) {
    allArticle(
      where: {
        AND: [
          {
            legalArea: {
              findOne: { LegalArea: { legalAreaName: { eq: $legalAreaName } } }
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
