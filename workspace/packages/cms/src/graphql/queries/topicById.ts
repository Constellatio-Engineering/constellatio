import { gql } from "graphql-request";

import { f_Topic } from "../fragments/Topic";

export const q_topicById = gql`
  ${f_Topic}
  query getTopicById($id: ID!) {
    Topic(id: $id) {
      ...Topic
    }
  }
`;
