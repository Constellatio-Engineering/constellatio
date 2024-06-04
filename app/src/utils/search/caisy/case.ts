import type { IGenCase } from "@/services/graphql/__generated/sdk";
import type { Nullable } from "@/utils/types";
import { getIdsFromObjects } from "@/utils/utils";

export type CaseSearchIndexItem = {
  id: Nullable<string>;
  legalAreaId: Nullable<string>;
  mainCategoryId: Nullable<string>;
  tagsIds: string[];
  title: Nullable<string>;
  topicsIds: string[];
};

export type CaseSearchItemNodes = keyof CaseSearchIndexItem;

export const createCaseSearchIndexItem = (fullCase: IGenCase): CaseSearchIndexItem =>
{
  const caseSearchIndexItem: CaseSearchIndexItem = {
    id: fullCase.id,
    legalAreaId: fullCase.legalArea?.id,
    mainCategoryId: fullCase.mainCategoryField?.[0]?.id,
    tagsIds: getIdsFromObjects(fullCase.tags),
    title: fullCase.title,
    topicsIds: getIdsFromObjects(fullCase.topic),
  };

  return caseSearchIndexItem;
};
