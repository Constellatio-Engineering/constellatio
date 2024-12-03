import { gql } from "graphql-request";

export const f_LearningTest = gql`
	fragment LearningTest on LearningTest {
		__typename
		id
		gamifications {
			...CardSelectionGame,
			...DragNDropGame,
			...FillInGapsGame
		}
	}
`;
