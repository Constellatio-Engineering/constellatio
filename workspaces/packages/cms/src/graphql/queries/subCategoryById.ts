import { gql } from "graphql-request";
import { f_SubCategory } from "../fragments/SubCategroy";

export const q_subCategoryById = gql`
  ${f_SubCategory}
  query getSubCategoryById($id: ID!) {
    SubCategory(id: $id) {
      ...SubCategory
    }
  }
`;
