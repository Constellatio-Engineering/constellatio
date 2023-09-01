import { gql } from "graphql-request";

import { f_Case } from "../fragments/f_Case";

export const q_case_by_id = gql`
  ${f_Case}
  query q_case_by_id($id: ID!) {
    Case(id: $id) {
      ...Case
    }
  }
`;
