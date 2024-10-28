import { gql } from "graphql-request";

export const getAllArticlesByTopic = gql`
  query getAllArticlesByTopic($topicName: String!) {
    allArticle(
      where: {
        AND: [
          {
            topic: {
              findOne: { Topic: { topicName: { eq: $topicName } } }
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
