import { gql } from "graphql-request";
import { f_LegalArea } from "../fragments/LegalArea";

export const q_legalAreaById = gql`
  ${f_LegalArea}
  query getLegalAreaById($id: ID!) {
    LegalArea(id: $id) {
      ...LegalArea
    }
  }
`;
