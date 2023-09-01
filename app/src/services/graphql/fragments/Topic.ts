import { gql } from "graphql-request";

export const f_Topic = gql`
	fragment Topic on Topic {
		__typename
		id
		topicName
	}
`;
