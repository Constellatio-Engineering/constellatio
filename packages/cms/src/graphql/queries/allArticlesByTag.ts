import { gql } from "graphql-request";

export const getAllArticlesByTag = gql`
  query getAllArticlesByTag($tagName: String!) {
    allArticle(
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
