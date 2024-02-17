import { f_Topic } from "@/services/graphql/fragments/Topic";

import { gql } from "graphql-request";

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
