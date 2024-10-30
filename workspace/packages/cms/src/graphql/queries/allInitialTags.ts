import { gql } from "graphql-request";

import { f_Tags } from "../fragments/Tags";

export const q_allTags = gql`
	${f_Tags}
	query getInitialTags {
    allTags(
      where: {
        isShownInitiallyBeforeSearch: true
      }
    ) {
      edges {
        node {
          ...Tags
        }
      }
    }
	}
`;
