import { gql } from "graphql-request";

import { f_CaseFullTextTasks } from "./CaseFullTextTasks";

export const f_LearningTestCase = gql`
	${f_CaseFullTextTasks}
	fragment LearningTestCase on Case {
		__typename
		_meta{
			updatedAt
		}
		id
		title
		fullTextTasks {
			...CaseFullTextTasks
		}
	}
`;
