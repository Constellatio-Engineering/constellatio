import { gql } from "graphql-request";

import { f_LearningTestCase } from "./LearningTestCase";

export const f_LearningPathUnit = gql`
	${f_LearningTestCase}
	fragment LearningPathUnit on LearningPathUnit {
		__typename
		id
		title
		ignoreOrder
		contentPieces {
			...ArticleOverview
			...CaseOverview
		}
		caseLearningTests {
			...LearningTestCase
		}
	}
`;
