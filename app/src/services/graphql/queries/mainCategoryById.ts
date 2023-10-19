import { f_MainCategory } from "@/services/graphql/fragments/MainCategory";

import { gql } from "graphql-request";

export const q_mainCategoryById = gql`
  ${f_MainCategory}
  query getMainCategoryById($id: ID!) {
    MainCategory(id: $id) {
      ...MainCategory
    }
  }
`;
