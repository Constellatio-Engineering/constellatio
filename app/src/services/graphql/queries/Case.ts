import { gql } from "graphql-request";

import { f_Case } from "../fragments/Case";

export const q_Cases = gql`
  ${f_Case}
  query Cases {
    allCase {
      edges {
        node {
          ...Case
        }
      }
    }
  }
`;

export const qCase = gql`
  ${f_Case}
  query CaseById($id: ID!) {
    Case(id: $id) {
      ...Case
    }
  }
`;
