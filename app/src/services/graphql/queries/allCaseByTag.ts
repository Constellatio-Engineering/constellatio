import { gql } from "graphql-request";

export const getAllCasesByTag = gql`
  query getAllCasesByTag($tagName: String!) {
    allCase(
      where: {
        AND: [
          {
            tags: {
              findOne: { Tags: { tagName: { eq: $tagName } } }
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
