import { f_Topic } from "@/services/graphql/fragments/Topic";

import { gql } from "graphql-request";

export const q_topicById = gql`
  ${f_Topic}
  query getTopicById($id: ID!) {
    Topic(id: $id) {
      ...Topic
    }
  }
`;
