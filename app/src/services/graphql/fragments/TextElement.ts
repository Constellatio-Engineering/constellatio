import { gql } from "graphql-request";

export const f_TextElement = gql`
  fragment TextElement on TextElement {
    id
    richTextContent {
      connections {
        __typename
      }
      json
    }
  }
`;
