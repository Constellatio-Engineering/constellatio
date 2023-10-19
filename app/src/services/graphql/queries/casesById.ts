import { gql } from "graphql-request";

export const getAllCasesById = gql`
  query getAllCasesById($ids: [ID!]!) {
    allCase(
      where: {
        
      }
    ) {
      totalCount
      edges {
        node {
          title
          id
        }
      }
    }
  }
`;
