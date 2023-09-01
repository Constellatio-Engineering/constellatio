import { gql } from "graphql-request";

import { f_FullCase } from "../fragments/FullCase";

export const q_case_by_id = gql`
  ${f_FullCase}
  query q_case_by_id($id: ID!) {
    Case(id: $id) {
      ...Case
    }
  }
`;
