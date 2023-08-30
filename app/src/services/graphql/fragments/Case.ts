import { gql } from "graphql-request";

export const f_Case = gql`
  fragment Case on Case {
    id
    title
    legalArea
    facts {
      json
    }
  
  }
`;
