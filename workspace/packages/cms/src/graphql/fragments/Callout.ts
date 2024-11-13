import { gql } from "graphql-request";

export const f_Callout = gql`
	fragment Callout on Callout {
		__typename
		id
		calloutType
		expandable
		text {
			connections {
				__typename
			}
			json
		}
	}
`;
