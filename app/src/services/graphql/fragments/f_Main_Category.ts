import { gql } from "graphql-request";

export const f_Category = gql`
    fragment MainCategory on MainCategory {
      __typename
        id
        icon{
          src
          title
        }
        mainCategory
    }


`