import { gql } from "graphql-request";
import { f_Tags } from "../fragments/Tags";

export const q_allTags = gql`
	${f_Tags}
	query getAllTags($after: String) {
    allTags(first: 100, after: $after) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...Tags
        }
      }
    }
	}
`;
