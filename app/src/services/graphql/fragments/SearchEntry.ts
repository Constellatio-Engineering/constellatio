import { gql } from "graphql-request";

export const f_SearchEntry = gql`
	fragment SearchEntry on SearchEntry {
		__typename
		id
		searchField
	}
`;
