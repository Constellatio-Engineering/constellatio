import { gql } from "graphql-request";

export const f_FillInGapsGame = gql`
	fragment FillInGapsGame on FillInGapsGame {
		__typename
		id
		question
		fillGameParagraph {
			connections {
				__typename
			}
			json
		}
		helpNote {
			connections {
				__typename
			}
			json
		}
	}
`;
