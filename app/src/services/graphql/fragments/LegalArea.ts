import { gql } from "graphql-request";

export const f_LegalArea = gql`
	fragment LegalArea on LegalArea {
		__typename
		id
		legalAreaName
	}
`;
