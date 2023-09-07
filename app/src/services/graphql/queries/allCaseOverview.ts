import { gql } from "graphql-request";

import { f_CaseOverview } from "../fragments/CaseOverview";

export const q_allCaseOverview = gql`
	${f_CaseOverview}
	query getAllCaseOverview($after: String) {
		allCase(first: 100, after: $after) {
			totalCount
			pageInfo {
				endCursor
				hasNextPage
			}
			edges {
				node {
					...CaseOverview
				}
			}
		}
	}
`;
