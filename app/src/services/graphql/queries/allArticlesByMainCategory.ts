import { gql } from "graphql-request";

export const getAllArticlesByMainCategory = gql`
  query getAllArticlesByMainCategory($mainCategoryName: String!) {
    allArticle(
      where: {
        AND: [
          {
            mainCategoryField: {
              findOne: { MainCategory: { mainCategory: { eq: $mainCategoryName } } }
            }
          }
        ] 
      }
    ) {
      totalCount
      edges {
        node {
          id
        }
      }
    }
  }
`;
