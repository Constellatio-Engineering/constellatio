import { gql } from "graphql-request";

import { f_LearningTest } from "./LearningTest";

export const f_LearningPathUnit = gql`
	${f_LearningTest}
	fragment LearningPathUnit on LearningPathUnit {
		__typename
		id
		title
		ignoreOrder
		contentPieces {
			...ArticleOverview
			...CaseOverview
		}
		learningTests {
			...LearningTest
		}
	}
`;
