import { gql } from "graphql-request";

import { f_Case } from "../fragments/f_Case";

export const q_all_case = gql`
  ${f_Case}
  query q_all_case {
    allCase {
      edges {
        node {
          ...Case
        }
      }
    }
  }
`;
