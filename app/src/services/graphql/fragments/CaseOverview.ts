import { gql } from "graphql-request";

import { f_SubCategory } from "./SubCategory";
import { f_Topic } from "./Topic";

export const f_CaseOverview = gql`
	${f_SubCategory}
	${f_Topic}
	fragment CaseOverview on Case {
		__typename
		id
		title
		durationToCompleteInMinutes
		subCategoryField {
			...SubCategory
		}
		topic {
			...Topic
		}
	}
`;
