import { gql } from "graphql-request";

import { f_FullTextTasks } from "./FullTextTasks";
import { f_LegalArea } from "./LegalArea";
import { f_MainCategory } from "./MainCategory";
import { f_SubCategory } from "./SubCategory";
import { f_Tags } from "./Tags";
import { f_TextElement } from "./TextElement";
import { f_Topic } from "./Topic";

export const f_FullCase = gql`
	${f_MainCategory}
	${f_LegalArea}
	${f_SubCategory}
	${f_Tags}
	${f_Topic}
	${f_FullTextTasks}
	${f_TextElement}
	fragment FullCase on Case {
		__typename
		id
		title
		durationToCompleteInMinutes
		facts {
			...TextElement
		}
		fullTextTasks {
			...FullTextTasks
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
		resolution{
        	...TextElement
        }
	}
`;
