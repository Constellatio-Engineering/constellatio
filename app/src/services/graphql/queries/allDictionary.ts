import { gql } from "graphql-request";

import { f_Dictionary } from "../fragments/Dictionary";

export const getAllDictionary = gql`
${f_Dictionary}
	query getAllDictionary($after: String) {
		allDictionary(first: 100, after: $after) {
			totalCount
			pageInfo {
				endCursor
				hasNextPage
			}
			edges {
				node {
                    facts {
          id
          richTextContent {
            json
          }
        }
        fullTextTasks {
          json
          connections {
            __typename
          }
        }
        id
        legalArea {
          ... on LegalArea {
            id
            legalAreaName
          }
          ... on SubCategory {
            id
            subCategory
            mainCategory {
              ... on MainCategory {
                id
                mainCategory
              }
            }
          }
        }
        mainCategoryField {
          ... on MainCategory {
            id
            mainCategory
          }
        }
        resolution {
          id
          richTextContent {
            json
            connections {
              __typename
            }
          }
        }
        subCategoryField {
          ... on SubCategory {
            id
            subCategory
            mainCategory {
              ... on MainCategory {
                id
                mainCategory
              }
            }
          }
        }
        tags {
          ... on Tags {
            id
            tagName
          }
        }
        title
        topic {
          ... on Topic {
            id
            topicName
          }
        }
        __typename
				}
			}
		}
	}
`;
