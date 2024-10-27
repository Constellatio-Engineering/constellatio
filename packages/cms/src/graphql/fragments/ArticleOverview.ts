import { gql } from "graphql-request";

import { f_LegalArea } from "./LegalArea";
import { f_MainCategory } from "./MainCategory";
import { f_Tags } from "./Tags";
import { f_Topic } from "./Topic";

export const f_ArticleOverview = gql`
	${f_Topic}
	${f_Tags}
	${f_LegalArea}
	${f_MainCategory}
	fragment ArticleOverview on Article {
		__typename
		id
		title
		_meta{
			createdAt
		}
		legalArea{
			...LegalArea
		}
		tags {
			...Tags
		}
		topic {
			...Topic
		}
		mainCategoryField {
			...MainCategory
		}
	}
`;
