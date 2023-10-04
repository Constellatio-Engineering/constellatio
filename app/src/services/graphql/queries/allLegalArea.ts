import { gql } from "graphql-request";

import { f_LegalArea } from "../fragments/LegalArea";

export const getAllLegalArea = gql`
  ${f_LegalArea}
  query getAllLegalArea {
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
