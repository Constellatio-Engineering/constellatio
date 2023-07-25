import { gql } from "graphql-request";
import { f_TextElement } from "../fragments/TextElement";
import { f_Headline } from "../fragments/Headline";
import { f_Callout } from "../fragments/Callout";

export const q_Page = gql`
  ${f_TextElement}
  ${f_Headline}
  ${f_Callout}
  query Page($slug: String!) {
    allPage(where: { slug: { eq: $slug } }) {
      edges {
        node {
          id
          nameInNavigation
          slug
          components {
            ...Headline
            ...TextElement
            ...Callout
          }
        }
      }
    }
  }
`;
