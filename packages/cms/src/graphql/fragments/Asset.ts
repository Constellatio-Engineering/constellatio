import { gql } from "graphql-request";

export const f_Asset = gql`
  fragment Asset on Asset {
    title
    src
    originType
    width
    height
    keywords
    id
    dominantColor
    description
    copyright
    author
  }
`;
