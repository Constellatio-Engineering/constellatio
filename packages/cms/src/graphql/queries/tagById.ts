import { gql } from "graphql-request";
import { f_Tags } from "../fragments/Tags";

export const q_tagsById = gql`
  ${f_Tags}
  query getTagsById($id: ID!) {
    Tags(id: $id) {
      ...Tags
    }
  }
`;
