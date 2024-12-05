import { gql } from "graphql-request";

import { f_CardSelectionGame } from "./CardSelectionGame";
import { f_DragNDropGame } from "./DragNDropGame";
import { f_FillInGapsGame } from "./FillInGapsGame";

export const f_LearningTestContent = gql`
	${f_FillInGapsGame}
	${f_CardSelectionGame}
	${f_DragNDropGame}
	fragment LearningTestContent on LearningTest_content {
		__typename
		json
		connections {
			__typename
			...FillInGapsGame
			...CardSelectionGame
			...DragNDropGame
		}
	}
`;
