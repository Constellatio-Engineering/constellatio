import { gql } from "graphql-request";
import { f_Topic } from "../fragments/Topic";

export const q_allMainCategory = gql`
	${f_Topic}
	query getAllTopics {
		allTopic {
			totalCount
			edges {
				node {
					...Topic
				}
			}
		}
	}
`;
