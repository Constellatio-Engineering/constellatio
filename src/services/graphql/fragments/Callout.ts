import { gql } from "graphql-request";
import { f_Asset } from "./Asset";
import { f_TextElement } from "./TextElement";

export const f_Callout = gql`
  ${f_Asset}
  ${f_TextElement}
  fragment Callout on Callout {
    id
    title
    icon {
      ...Asset
    }
    text {
      ...TextElement
    }
  }
`;
