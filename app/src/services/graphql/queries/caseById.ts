import { gql } from "graphql-request";

import { f_FullCase } from "../fragments/FullCase";

export const q_caseById = gql`
  ${f_FullCase}
  query caseById($id: ID!) {
    Case(id: $id) {
      ...FullCase
    }
  }
`;
