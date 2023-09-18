import { gql } from "graphql-request";

import { f_CaseFullTextTasks } from "./CaseFullTextTasks";
import { f_LegalArea } from "./LegalArea";
import { f_MainCategory } from "./MainCategory";
import { f_SubCategory } from "./SubCategory";
import { f_Tags } from "./Tags";
import { f_Topic } from "./Topic";

export const f_FullCase = gql`
	${f_MainCategory}
	${f_LegalArea}
	${f_SubCategory}
	${f_Tags}
	${f_Topic}
	${f_CaseFullTextTasks}
	fragment FullCase on Case {
		__typename
		id
		title
		durationToCompleteInMinutes
		facts {
			connections {
				__typename
			}
			json
		}
		fullTextTasks {
			...CaseFullTextTasks
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
		resolution {
			connections {
				__typename
			}
			json
		}
	}
`;
