import { f_Tags } from "@/services/graphql/fragments/Tags";

import { gql } from "graphql-request";

export const q_tagsById = gql`
  ${f_Tags}
  query getTagsById($id: ID!) {
    Tags(id: $id) {
      ...Tags
    }
  }
`;
