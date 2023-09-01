import { gql } from "graphql-request";

import { f_MainCategory } from "../fragments/MainCategory";

export const q_all_category = gql`
	${f_MainCategory}
	query q_all_category {
		allMainCategory {
			totalCount
			edges {
				node {
					...MainCategory
				}
			}
		}
	}
`;
