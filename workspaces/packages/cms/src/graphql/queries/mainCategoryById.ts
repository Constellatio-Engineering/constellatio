import { gql } from "graphql-request";
import { f_MainCategory } from "../fragments/MainCategory";

export const q_mainCategoryById = gql`
  ${f_MainCategory}
  query getMainCategoryById($id: ID!) {
    MainCategory(id: $id) {
      ...MainCategory
    }
  }
`;
