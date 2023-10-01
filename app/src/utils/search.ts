import { type UploadedFile } from "@/db/schema";
import {
  type IGenArticle,
  type IGenCase, type IGenLegalArea, type IGenMainCategory, type IGenSubCategory, type IGenTags
} from "@/services/graphql/__generated/sdk";
import {
  type DotSeparatedKeys,
  type Nullable, type NullableProperties, type RemoveUndefined, type Values
} from "@/utils/types";

export const searchIndices = {
  articles: "articles",
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

type ArticleSearchIndexItemContent = {
  id: string;
  legalArea: Pick<IGenLegalArea, "legalAreaName" | "id">;
  mainCategory: Pick<IGenMainCategory, "mainCategory" | "id">;
  subCategory: Pick<IGenSubCategory, "subCategory" | "id">;
  tags: Array<Pick<IGenTags, "id" | "tagName">>;
  title: string;
};

export type ArticleSearchIndexItem = NullableProperties<ArticleSearchIndexItemContent>;
export type ArticleSearchItemNodes = RemoveUndefined<DotSeparatedKeys<ArticleSearchIndexItemContent>>;

export const createArticleSearchIndexItem = (fullArticle: IGenArticle): ArticleSearchIndexItem =>
{
  let legalAreaName: Nullable<string>;

  switch (fullArticle.legalArea?.__typename)
  {
    case "LegalArea":
      legalAreaName = fullArticle.legalArea.legalAreaName;
      break;
    case "SubCategory":
      legalAreaName = fullArticle.legalArea?.subCategory;
      break;
    default:
      legalAreaName = null;
      console.warn("Unknown legal area type" + fullArticle.legalArea?.__typename);
  }

  const articleSearchIndexItem: CaseSearchIndexItem = {
    id: fullArticle.id,
    legalArea: {
      id: fullArticle.legalArea?.id,
      legalAreaName,
    },
    mainCategory: {
      id: fullArticle.mainCategoryField?.[0]?.id,
      mainCategory: fullArticle.mainCategoryField?.[0]?.mainCategory,
    },
    subCategory: {
      id: fullArticle.subCategoryField?.[0]?.id,
      subCategory: fullArticle.subCategoryField?.[0]?.subCategory,
    },
    tags: fullArticle.tags?.map(tag => ({
      id: tag?.id,
      tagName: tag?.tagName,
    })) || [],
    title: fullArticle.title
  };

  return articleSearchIndexItem;
};

export type UploadSearchIndexItem = Pick<UploadedFile, "id" | "originalFilename" | "userId">;
export type UploadSearchItemNodes = RemoveUndefined<DotSeparatedKeys<UploadSearchIndexItem>>;

export const createUploadsSearchIndexItem = ({
  id,
  originalFilename,
  userId
}: Pick<UploadedFile, "originalFilename" | "userId" | "id">): UploadSearchIndexItem =>
{
  return ({ id, originalFilename, userId });
};
