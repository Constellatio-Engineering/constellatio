import { gql } from "graphql-request";

export const f_LegalArea = gql`
	fragment LegalArea on LegalArea {
		legalAreaName
        id
		sorting
        __typename
	}
`;
