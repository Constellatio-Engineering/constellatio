import { gql } from "graphql-request";

export const f_CardSelectionGame = gql`
	fragment CardSelectionGame on CardSelectionGame {
		id
		game
		question
		helpNote {
				connections {
					__typename
				}
				json
		}
	}
`;
