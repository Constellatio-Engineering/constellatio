import { gql } from "graphql-request";

import { f_TextElement } from "./TextElement";

export const f_DragNDropGame = gql`
${f_TextElement}
  fragment DragNDropGame on DragNDropGame {
    __typename
    id
    game
    question
    helpNote {
      ...TextElement
    }
  }
`;
