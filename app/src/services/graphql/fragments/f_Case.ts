
import { gql } from "graphql-request";

export const f_Case = gql`
  fragment Case on Case {
    __typename
    title
    topic {
      ... on Topic {
        id
        topicName
      }
    }
    tags {
      ... on Tags {
        id
        tagName
      }
    }
    mainCategoryField {
      ... on MainCategory {
        mainCategory
      }
    }
    subCategoryField {
      ... on SubCategory {
        subCategory
        mainCategory {
          ... on MainCategory {
            mainCategory
          }
        }
      }
    }
    legalArea {
      ... on LegalArea {
        id
        legalAreaName
      }
    }
    fullTextTasks {
      json
    }
    fact {
      json
    }
    durationToComplete
  }
`;
