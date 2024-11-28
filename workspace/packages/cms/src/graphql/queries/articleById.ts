import { gql } from "graphql-request";

import { f_FullArticle } from "../fragments/FullArticle";

export const q_articleById = gql`
  ${f_FullArticle}
  query getArticleById($id: ID!) {
    Article(id: $id) {
      ...FullArticle
    }
  }
`;
