import type { IGenLegalArea } from "@/services/graphql/__generated/sdk";
import type { Nullable } from "@/utils/types";

export type LegalAreaSearchIndexItem = {
  id: Nullable<string>;
  legalAreaName: Nullable<string>;
};

export type LegalAreaSearchItemNodes = keyof LegalAreaSearchIndexItem;
export type LegalAreaSearchItemUpdate = LegalAreaSearchIndexItem;

export const createLegalAreaSearchIndexItem = ({ id, legalAreaName }: IGenLegalArea): LegalAreaSearchIndexItem =>
{
  const legalAreaSearchIndexItem: LegalAreaSearchIndexItem = {
    id,
    legalAreaName
  };

  return legalAreaSearchIndexItem;
};

export const legalAreaSearchIndexItemPrimaryKey: keyof LegalAreaSearchIndexItem = "id";
