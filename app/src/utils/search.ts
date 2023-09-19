import {
  type IGenCase, type IGenLegalArea, type IGenMainCategory, type IGenSubCategory, type IGenTags 
} from "@/services/graphql/__generated/sdk";
import { type Nullable, type NullableProperties } from "@/utils/types";

export const searchIndices = {
  cases: "cases",
};

export type CaseSearchIndexItem = NullableProperties<{
  id: string;
  legalArea: Pick<IGenLegalArea, "legalAreaName" | "id">;
  mainCategory: Pick<IGenMainCategory, "mainCategory" | "id">;
  subCategory: Pick<IGenSubCategory, "subCategory" | "id">;
  tags: Array<Pick<IGenTags, "id" | "tagName">>;
  title: string;
}>;

export const createCaseSearchIndexItem = (fullCase: IGenCase): CaseSearchIndexItem =>
{
  let legalAreaName: Nullable<string>;

  switch (fullCase.legalArea?.__typename)
  {
    case "LegalArea":
      legalAreaName = fullCase.legalArea.legalAreaName;
      break;
    case "SubCategory":
      legalAreaName = fullCase.legalArea?.subCategory;
      break;
    default:
      legalAreaName = null;
      console.warn("Unknown legal area type" + fullCase.legalArea?.__typename);
  }

  const caseSearchIndexItem: CaseSearchIndexItem = {
    id: fullCase.id,
    legalArea: {
      id: fullCase.legalArea?.id,
      legalAreaName,
    },
    mainCategory: {
      id: fullCase.mainCategoryField?.[0]?.id,
      mainCategory: fullCase.mainCategoryField?.[0]?.mainCategory,
    },
    subCategory: {
      id: fullCase.subCategoryField?.[0]?.id,
      subCategory: fullCase.subCategoryField?.[0]?.subCategory,
    },
    tags: fullCase.tags?.map(tag => ({
      id: tag?.id,
      tagName: tag?.tagName,
    })) || [],
    title: fullCase.title
  };

  return caseSearchIndexItem;
};
