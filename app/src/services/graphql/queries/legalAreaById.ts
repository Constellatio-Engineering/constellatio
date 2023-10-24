import { f_LegalArea } from "@/services/graphql/fragments/LegalArea";

import { gql } from "graphql-request";

export const q_legalAreaById = gql`
  ${f_LegalArea}
  query getLegalAreaById($id: ID!) {
    LegalArea(id: $id) {
      ...LegalArea
    }
  }
`;
