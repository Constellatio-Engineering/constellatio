import { gql } from "graphql-request";

import { f_LegalArea } from "./LegalArea";
import { f_MainCategory } from "./MainCategory";
import { f_Tags } from "./Tags";
import { f_Topic } from "./Topic";

export const f_CaseOverview = gql`
	${f_LegalArea}
	${f_Topic}
	${f_Tags}
	${f_MainCategory}
	fragment CaseOverview on Case {
		__typename
		id
		title
		_meta{
			createdAt
		}
		durationToCompleteInMinutes
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
