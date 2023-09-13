import { gql } from "graphql-request";

import { f_ArticleOverview } from "../fragments/ArticleOverview";

export const q_allArticleOverview = gql`
	${f_ArticleOverview}
	query getAllArticleOverview($after: String) {
		allArticle(first: 100, after: $after) {
			totalCount
			pageInfo {
				endCursor
				hasNextPage
			}
			edges {
				node {
					...ArticleOverview
				}
			}
		}
	}
`;
