import { gql } from "graphql-request";

import { f_TextElement } from "./TextElement";

export const f_SelectionCard = gql`
  ${f_TextElement}
  fragment SelectionCard on SelectionCard {
    id
    game
    question
    helpNote {
      ...TextElement
    }
  }
`;
