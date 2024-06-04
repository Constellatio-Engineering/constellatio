import { f_CaseOverview } from "@/services/graphql/fragments/CaseOverview";

import { gql } from "graphql-request";

export const q_caseOverviewById = gql`
  ${f_CaseOverview}
  query getCaseOverviewById($id: ID!) {
    Case(id: $id) {
      ...CaseOverview
    }
  }
`;
