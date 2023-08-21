import { gql } from "graphql-request";

import { f_TextElement } from "./TextElement";

export const f_CaseSection = gql`
${f_TextElement}
  fragment CaseSection on CaseSection {
    id
    title
    game {
      id
      helpNote{
        ...TextElement
      }
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
    legalArea
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
