import { gql } from "graphql-request";

import { f_Callout } from "./Callout";
import { f_CardSelectionGame } from "./CardSelectionGame";
import { f_DragNDropGame } from "./DragNDropGame";
import { f_FillInGapsGame } from "./FillInGapsGame";
import { f_ImageWrapperCard } from "./ImageWrapperCard";

export const f_FullTextTasks = gql`
	${f_FillInGapsGame}
	${f_CardSelectionGame}
	${f_DragNDropGame}
	${f_ImageWrapperCard}
	${f_Callout}
	fragment FullTextTasks on Case_fullTextTasks {
		__typename
		json
		connections {
			__typename
			...FillInGapsGame
			...CardSelectionGame
			...DragNDropGame
			...ImageWrapperCard
			...Callout
		}
	}
`;
