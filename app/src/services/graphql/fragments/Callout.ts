import { gql } from "graphql-request";

import { f_TextElement } from "./TextElement";

export const f_Callout = gql`
  ${f_TextElement}
  fragment Callout on Callout {
    __typename
    id
    calloutType
    expandable
    text {
      ...TextElement
    }
  }
`;
