import { gql } from "graphql-request";

export const q_Page = gql`
  query Page($slug: String!) {
    allPage(where: { slug: { eq: $slug } }) {
      edges {
        node {
          id
          nameInNavigation
          slug
          components {
            ... on Headline {
              title
            }
            ... on TextElement {
              id
              richTextContent {
                connections {
                  __typename
                }
                json
              }
            }
          }
        }
      }
    }
  }
`;
