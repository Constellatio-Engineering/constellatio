import { gql } from "graphql-request";

import { f_ArticleFullTextTasks } from "./ArticleFullTextTasks";
import { f_LegalArea } from "./LegalArea";
import { f_MainCategory } from "./MainCategory";
import { f_Tags } from "./Tags";
import { f_Topic } from "./Topic";

export const f_FullArticle = gql`
	${f_MainCategory}
	${f_LegalArea}
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
		}
		mainCategoryField {
			...MainCategory
		}
		tags {
			...Tags
		}
		topic {
			...Topic
		}
	}
`;
