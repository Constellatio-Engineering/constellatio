import { gql } from "graphql-request";

import { f_TextElement } from "./TextElement";

export const f_DragNDrop = gql`
${f_TextElement}
  fragment DragNDrop on DragNDrop {
    id
    game
    question
    helpNote {
      ...TextElement
    }
  }
`;
