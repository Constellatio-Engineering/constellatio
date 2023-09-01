import { gql } from "graphql-request";

import { f_Asset } from "./Asset";

export const f_MainCategory = gql`
	${f_Asset}
	fragment MainCategory on MainCategory {
		__typename
		id
		icon {
			...Asset
		}
		mainCategory
	}
`;
