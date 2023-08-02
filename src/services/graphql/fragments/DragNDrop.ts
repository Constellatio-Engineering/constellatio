import { gql } from "graphql-request";

export const f_DragNDrop = gql`
  fragment DragNDrop on DragNDrop {
    id
    game
    helpNote
  }
`