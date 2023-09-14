import { gql } from "graphql-request";

import { f_TextElement } from "./TextElement";

export const f_CardSelectionGame = gql`
	${f_TextElement}
	fragment CardSelectionGame on CardSelectionGame {
		id
		game
		question
		helpNote {
			...TextElement
		}
	}
`;
