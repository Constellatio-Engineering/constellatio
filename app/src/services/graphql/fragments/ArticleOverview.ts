import { gql } from "graphql-request";

import { f_SubCategory } from "./SubCategory";
import { f_Topic } from "./Topic";

export const f_ArticleOverview = gql`
	${f_SubCategory}
	${f_Topic}
	fragment ArticleOverview on Article {
		__typename
		id
		title
		subCategoryField {
			...SubCategory
		}
		topic {
			...Topic
		}
	}
`;
