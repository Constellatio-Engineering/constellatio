import { gql } from "graphql-request";

export const f_CaseSection = gql`
  fragment CaseSection on CaseSection {
    id
    title
    game {
      id
      helpNote
      game
    }
    content {
      json
    }
  }
`;

export const f_Case = gql`
  ${f_CaseSection}
  fragment Case on Case {
    id
    title
    legalArea {
      title
    }
    topic {
      title
    }
    facts {
      json
    }
    sections {
      ... on CaseSection {
        ...CaseSection
      }
    }
  }
`;
