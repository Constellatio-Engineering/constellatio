import { gql } from "graphql-request";

export const f_Fact = gql`
	fragment Fact on Case_fact {
		__typename
		json
	}
`;
