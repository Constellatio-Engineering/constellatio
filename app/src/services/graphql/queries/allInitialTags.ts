import { f_Tags } from "@/services/graphql/fragments/Tags";

import { gql } from "graphql-request";

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
