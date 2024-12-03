import { gql } from "graphql-request";

import { f_LearningPath } from "../fragments/LearningPath";

export const q_learningPathById = gql`
  ${f_LearningPath}
  query getLearningPathById($id: ID!) {
    LearningPath(id: $id) {
      ...LearningPath
    }
  }
`;
