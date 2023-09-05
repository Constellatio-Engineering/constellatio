import { gql } from "graphql-request";

import { f_MainCategory } from "../fragments/MainCategory";

export const q_allMainCategory = gql`
	${f_MainCategory}
	query allMainCategory {
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
