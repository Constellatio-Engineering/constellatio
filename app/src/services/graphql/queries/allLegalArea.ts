import { gql } from "graphql-request";

import { f_LegalArea } from "../fragments/LegalArea";

export const q_all_LegalArea = gql`
  ${f_LegalArea}
  query q_all_LegalArea {
    allLegalArea {
      totalCount
      edges {
        node {
          ...LegalArea
        }
      }
    }
  }
`;
