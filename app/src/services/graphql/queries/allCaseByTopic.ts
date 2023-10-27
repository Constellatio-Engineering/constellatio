import { gql } from "graphql-request";

export const getAllCasesByTopic = gql`
  query getAllCasesByTopic($topicName: String!) {
    allCase(
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
