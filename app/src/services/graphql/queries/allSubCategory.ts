import { f_SubCategory } from "@/services/graphql/fragments/SubCategory";

import { gql } from "graphql-request";

export const q_allSubCategory = gql`
	${f_SubCategory}
	query getAllSubCategory {
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
