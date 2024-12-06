import { gql } from "graphql-request";

import { f_LearningPathUnit } from "./LearningPathUnit";

export const f_LearningPath = gql`
	${f_LearningPathUnit}
	fragment LearningPath on LearningPath {
		__typename
		id
		title
		description {
			connections {
				__typename
			}
			json
		}
		estimatedDuration
		units {
			...LearningPathUnit
		}
	}
`;
