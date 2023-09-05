import { gql } from "graphql-request";

import { f_SubCategory } from "../fragments/SubCategory";

export const q_allSubCategory = gql`
	${f_SubCategory}
	query allSubCategory {
		allSubCategory {
			totalCount
			edges {
				node {
					...SubCategory
				}
			}
		}
	}
`;
