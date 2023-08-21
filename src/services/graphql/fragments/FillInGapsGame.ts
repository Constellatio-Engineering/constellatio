import { gql } from "graphql-request";

import { f_TextElement } from "./TextElement";

export const f_FillInGapsGame = gql`
  ${f_TextElement}
  fragment FillInGapsGame on FillInGapsGame {
    id
    question
    fillGameParagraph {
      ...TextElement
    }
    helpNote {
      ...TextElement
    }
  }
`;
