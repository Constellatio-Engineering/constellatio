import { gql } from "graphql-request";

import { f_Asset } from "./Asset";

export const f_SubCategory = gql`
	${f_Asset}
	fragment SubCategory on SubCategory {
		__typename
		id
		subCategory
	}
`;
