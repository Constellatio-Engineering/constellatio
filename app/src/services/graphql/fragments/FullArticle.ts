import { gql } from "graphql-request";

import { f_ArticleFullTextTasks } from "./ArticleFullTextTasks";
import { f_LegalArea } from "./LegalArea";
import { f_MainCategory } from "./MainCategory";
import { f_SubCategory } from "./SubCategory";
import { f_Tags } from "./Tags";
import { f_Topic } from "./Topic";

export const f_FullArticle = gql`
	${f_MainCategory}
	${f_LegalArea}
	${f_SubCategory}
	${f_Tags}
	${f_Topic}
	${f_ArticleFullTextTasks}
	fragment FullArticle on Article {
		__typename
		id
		title
		fullTextTasks {
			...ArticleFullTextTasks
		}
		legalArea {
			...LegalArea
			...SubCategory
		}
		mainCategoryField {
			...MainCategory
		}
		subCategoryField {
			...SubCategory
		}
		tags {
			...Tags
		}
		topic {
			...Topic
		}
	}
`;
