import { gql } from "graphql-request";
import { f_TextElement } from "../fragments/TextElement";
import { f_Callout } from "../fragments/Callout";
import { f_ImageWrapperCard } from "../fragments/ImageWrapperCard";
import { f_DragNDrop } from "../fragments/DragNDrop";
import { f_SelectionCard } from "../fragments/SelectionCard";

export const q_Page = gql`
  ${f_TextElement}
  ${f_Callout}
  ${f_ImageWrapperCard}
  ${f_DragNDrop}
  ${f_SelectionCard}
  query Page($slug: String!) {
    allPage(where: { slug: { eq: $slug } }) {
      edges {
        node {
          id
          nameInNavigation
          slug
          components {
            ...TextElement
            ...Callout
            ...ImageWrapperCard
            ...DragNDrop
            ...SelectionCard
          }
        }
      }
    }
  }
`;
