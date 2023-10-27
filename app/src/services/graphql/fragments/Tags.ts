import { gql } from "graphql-request";

export const f_Tags = gql`
	fragment Tags on Tags {
		__typename
		id
		tagName
	}
`;
