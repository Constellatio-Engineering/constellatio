import { gql } from "graphql-request";

import { f_LegalArea } from "./LegalArea";
import { f_Topic } from "./Topic";

export const f_CaseOverview = gql`
	${f_LegalArea}
	${f_Topic}
	fragment CaseOverview on Case {
		__typename
		id
		title
		durationToCompleteInMinutes
		legalArea{
			...LegalArea
		}
		topic {
			...Topic
		}
	}
`;
