import { gql } from "graphql-request";

import { f_SearchEntry } from "../fragments/SearchEntry";

export const q_popularSearches = gql`
	${f_SearchEntry}
	query getPopularSearches {
		Search {
			__typename
			id
			popularCategories {
				...SearchEntry
			}
			popularSearches {
				...SearchEntry
			}
		}
	}
`;
