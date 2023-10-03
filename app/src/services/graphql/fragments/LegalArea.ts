import { gql } from "graphql-request";

export const f_LegalArea = gql`
	fragment LegalArea on LegalArea {
		legalAreaName
        id
        __typename
	}
`;
