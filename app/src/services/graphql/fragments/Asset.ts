import { gql } from "graphql-request";

export const f_Asset = gql`
  fragment Asset on Asset {
    title
    src
    originType
    width
    height
    blurHash
    keywords
    id
    dominantColor
    description
    copyright
    author
  }
`;
