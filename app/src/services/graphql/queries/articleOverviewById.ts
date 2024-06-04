import { f_ArticleOverview } from "@/services/graphql/fragments/ArticleOverview";

import { gql } from "graphql-request";

export const q_articleOverviewById = gql`
  ${f_ArticleOverview}
  query getArticleOverviewById($id: ID!) {
    Article(id: $id) {
      ...ArticleOverview
    }
  }
`;
