import { gql } from "graphql-request";

import { f_FullCase } from "../fragments/FullCase";

export const q_all_case = gql`
  ${f_FullCase}
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
