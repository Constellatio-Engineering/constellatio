import { gql } from "graphql-request";

export const f_Dictionary = gql`
    fragment Dictionary on Dictionary {
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
`;
