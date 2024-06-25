import { f_SubCategory } from "@/services/graphql/fragments/SubCategroy";

import { gql } from "graphql-request";

export const q_subCategoryById = gql`
  ${f_SubCategory}
  query getSubCategoryById($id: ID!) {
    SubCategory(id: $id) {
      ...SubCategory
    }
  }
`;
