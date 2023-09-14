import { gql } from "graphql-request";

import { f_Asset } from "./Asset";

export const f_ImageWrapperCard = gql`
${f_Asset}
  fragment ImageWrapperCard on ImageWrapperCard {
    __typename
    id
    downloadable
    image {
      ...Asset
    }
  }
`;
