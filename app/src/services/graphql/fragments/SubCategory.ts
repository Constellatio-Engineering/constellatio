import { gql } from "graphql-request";

import { f_MainCategory } from "./MainCategory";

export const f_SubCategory = gql`
	${f_MainCategory}
	fragment SubCategory on SubCategory {
		__typename
		id
		subCategory
		mainCategory {
			...MainCategory
		}
	}
`;
