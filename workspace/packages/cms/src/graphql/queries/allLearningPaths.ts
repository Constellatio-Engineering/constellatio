import { gql } from "graphql-request";

export const q_allLearningPaths = gql`
	query getAllLearningPaths($after: String) {
		allLearningPath(first: 100, after: $after) {
			totalCount
			pageInfo {
				endCursor
				hasNextPage
			}
			edges {
				node {
					...LearningPath
				}
			}
		}
	}
`;
