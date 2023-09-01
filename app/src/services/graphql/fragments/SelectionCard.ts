import { gql } from "graphql-request";

import { f_TextElement } from "./TextElement";

export const f_SelectionCard = gql`
  ${f_TextElement}
  fragment SelectionCard on CardSelectionGame {
    id
    game
    question
    helpNote {
      ...TextElement
    }
  }
`;
