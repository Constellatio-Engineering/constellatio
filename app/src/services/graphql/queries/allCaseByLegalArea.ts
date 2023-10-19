import { gql } from "graphql-request";

export const getAllCasesByLegalArea = gql`
  query getAllCasesByLegalArea($legalAreaName: String!) {
    allCase(
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
