import { gql } from "graphql-request";

export const f_DragNDropGame = gql`
	fragment DragNDropGame on DragNDropGame {
		__typename
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
