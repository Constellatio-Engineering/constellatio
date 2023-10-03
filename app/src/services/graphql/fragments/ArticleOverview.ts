import { gql } from "graphql-request";

import { f_LegalArea } from "./LegalArea";
import { f_Topic } from "./Topic";

export const f_ArticleOverview = gql`
	${f_Topic}
	${f_LegalArea}
	fragment ArticleOverview on Article {
		__typename
		id
		title
		legalArea{
			...LegalArea
		}
		topic {
			...Topic
		}
	}
`;
