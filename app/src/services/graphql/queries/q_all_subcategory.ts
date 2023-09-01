import { gql } from "graphql-request";

import { f_MainCategory } from "../fragments/MainCategory";

export const q_all_subcategory = gql`
	${f_MainCategory}
	query q_all_subcategory {
		allSubCategory {
			totalCount
			edges {
				node {
					id
					subCategory
					mainCategory {
						...MainCategory
					}
				}
			}
		}
	}
`;
