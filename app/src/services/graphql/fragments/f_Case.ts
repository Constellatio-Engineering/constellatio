
import { gql } from "graphql-request";

import { f_Category } from "./f_Main_Category";

export const f_Case = gql`
${f_Category}
  fragment Case on Case {
    __typename
    title
    id
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
      ...MainCategory
        
      
    }
    subCategoryField {
      ... on SubCategory {
        id
        subCategory
        mainCategory {
        ...MainCategory 
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
    durationToCompleteInMinutes
  }
`;
