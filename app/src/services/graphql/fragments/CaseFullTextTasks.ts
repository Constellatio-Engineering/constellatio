import { gql } from "graphql-request";

import { f_Asset } from "./Asset";
import { f_Callout } from "./Callout";
import { f_CardSelectionGame } from "./CardSelectionGame";
import { f_DragNDropGame } from "./DragNDropGame";
import { f_FillInGapsGame } from "./FillInGapsGame";

export const f_CaseFullTextTasks = gql`
	${f_FillInGapsGame}
	${f_CardSelectionGame}
	${f_DragNDropGame}
	${f_Callout}
	${f_Asset}
	fragment CaseFullTextTasks on Case_fullTextTasks {
		__typename
		connections {
			__typename
			...FillInGapsGame
			...CardSelectionGame
			...DragNDropGame
			...Callout
			...Asset
		}
	}
`;
