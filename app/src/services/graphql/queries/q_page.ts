import { gql } from "graphql-request";

import { f_Callout } from "../fragments/Callout";
import { f_CardSelectionGame } from "../fragments/CardSelectionGame";
import { f_DragNDropGame } from "../fragments/DragNDropGame";
import { f_FillInGapsGame } from "../fragments/FillInGapsGame";
import { f_ImageWrapperCard } from "../fragments/ImageWrapperCard";
import { f_TextElement } from "../fragments/TextElement";

export const q_page = gql`
  ${f_TextElement}
  ${f_Callout}
  ${f_ImageWrapperCard}
  ${f_DragNDropGame}
  ${f_CardSelectionGame}
  ${f_FillInGapsGame}
  query q_page($slug: String!) {
    allPage(where: { slug: { eq: $slug } }) {
      edges {
        node {
        
        }
      }
    }
  }
`;
