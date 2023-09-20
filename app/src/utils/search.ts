import { type Upload } from "@/db/schema";
import {
  type IGenCase, type IGenLegalArea, type IGenMainCategory, type IGenSubCategory, type IGenTags 
} from "@/services/graphql/__generated/sdk";
import {
  type DotSeparatedKeys,
  type Nullable, type NullableProperties, type RemoveUndefined, type Values
} from "@/utils/types";

export const searchIndices = {
  cases: "cases",
  userUploads: "user-uploads",
} as const;

export type SearchIndex = Values<typeof searchIndices>;

type CaseSearchIndexItemContent = {
  id: string;
  legalArea: Pick<IGenLegalArea, "legalAreaName" | "id">;
  mainCategory: Pick<IGenMainCategory, "mainCategory" | "id">;
  subCategory: Pick<IGenSubCategory, "subCategory" | "id">;
  tags: Array<Pick<IGenTags, "id" | "tagName">>;
  title: string;
};

export type CaseSearchIndexItem = NullableProperties<CaseSearchIndexItemContent>;
export type CaseSearchItemNodes = RemoveUndefined<DotSeparatedKeys<CaseSearchIndexItemContent>>;

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

export type UploadSearchIndexItem = Pick<Upload, "uuid" | "originalFilename" | "userId">;
export type UploadSearchItemNodes = RemoveUndefined<DotSeparatedKeys<UploadSearchIndexItem>>;

export const createUploadsSearchIndexItem = ({ originalFilename, userId, uuid }: Upload): UploadSearchIndexItem =>
{
  return ({ originalFilename, userId, uuid });
};
