import { gql } from "graphql-request";

import { f_Callout } from "../fragments/Callout";
import { f_DragNDrop } from "../fragments/DragNDrop";
import { f_FillInGapsGame } from "../fragments/FillInGapsGame";
import { f_ImageWrapperCard } from "../fragments/ImageWrapperCard";
import { f_SelectionCard } from "../fragments/SelectionCard";
import { f_TextElement } from "../fragments/TextElement";

export const q_Page = gql`
  ${f_TextElement}
  ${f_Callout}
  ${f_ImageWrapperCard}
  ${f_DragNDrop}
  ${f_SelectionCard}
  ${f_FillInGapsGame}
  query Page($slug: String!) {
    allPage(where: { slug: { eq: $slug } }) {
      edges {
        node {
          id
          nameInNavigation
          slug
          components {

             ...on PageContent{
              __typename
              title
              internalTitle
            categories{
              ...on Category{
                title
                id
                icon{
                  src
                  title
                }

              }
            }
          }
          }
        }
      }
    }
  }
`;
