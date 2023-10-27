import { type UploadedFile, type Document } from "@/db/schema";
import {
  type IGenTopic,
  type IGenArticle,
  type IGenCase, type IGenLegalArea, type IGenMainCategory, type IGenTags
} from "@/services/graphql/__generated/sdk";
import {
  type DotSeparatedKeys,
  type NullableProperties, type RemoveUndefined, type Values
} from "@/utils/types";
import { removeHtmlTagsFromString } from "@/utils/utils";

export const searchIndices = {
  articles: "articles",
  cases: "cases",
  userDocuments: "user-documents",
  userUploads: "user-uploads",
} as const;

export type SearchIndex = Values<typeof searchIndices>;

type CaseSearchIndexItemContent = {
  durationToCompleteInMinutes: number;
  id: string;
  legalArea: Pick<IGenLegalArea, "legalAreaName" | "id">;
  mainCategory: Pick<IGenMainCategory, "mainCategory" | "id" | "icon">;
  tags: Array<Pick<IGenTags, "id" | "tagName">>;
  title: string;
  topic: Array<Pick<IGenTopic, "id" | "topicName">>;
};

export type CaseSearchIndexItem = NullableProperties<CaseSearchIndexItemContent>;
export type CaseSearchItemNodes = RemoveUndefined<DotSeparatedKeys<CaseSearchIndexItemContent>>;

export const createCaseSearchIndexItem = (fullCase: IGenCase): CaseSearchIndexItem =>
{
  const legalAreaName = fullCase.legalArea?.legalAreaName;

  const caseSearchIndexItem: CaseSearchIndexItem = {
    durationToCompleteInMinutes: fullCase.durationToCompleteInMinutes,
    id: fullCase.id,
    legalArea: {
      id: fullCase.legalArea?.id,
      legalAreaName,
    },
    mainCategory: {
      icon: fullCase.mainCategoryField?.[0]?.icon,
      id: fullCase.mainCategoryField?.[0]?.id,
      mainCategory: fullCase.mainCategoryField?.[0]?.mainCategory
    },
    tags: fullCase.tags?.map(tag => ({
      id: tag?.id,
      tagName: tag?.tagName,
    })) || [],
    title: fullCase.title,
    topic: fullCase.topic?.map(item => ({
      id: item?.id,
      topicName: item?.topicName,
    })),
  };

  return caseSearchIndexItem;
};

type ArticleSearchIndexItemContent = {
  id: string;
  legalArea: Pick<IGenLegalArea, "legalAreaName" | "id">;
  mainCategory: Pick<IGenMainCategory, "mainCategory" | "id" | "icon">;
  tags: Array<Pick<IGenTags, "id" | "tagName">>;
  title: string;
  topic: Array<Pick<IGenTopic, "id" | "topicName">>;
};

export type ArticleSearchIndexItem = NullableProperties<ArticleSearchIndexItemContent>;
export type ArticleSearchItemNodes = RemoveUndefined<DotSeparatedKeys<ArticleSearchIndexItemContent>>;

export const createArticleSearchIndexItem = (fullArticle: IGenArticle): ArticleSearchIndexItem =>
{
  const legalAreaName = fullArticle.legalArea?.legalAreaName;

  const articleSearchIndexItem: ArticleSearchIndexItem = {
    id: fullArticle.id,
    legalArea: {
      id: fullArticle.legalArea?.id,
      legalAreaName,
    },
    mainCategory: {
      icon: fullArticle.mainCategoryField?.[0]?.icon,
      id: fullArticle.mainCategoryField?.[0]?.id,
      mainCategory: fullArticle.mainCategoryField?.[0]?.mainCategory,
    },
    tags: fullArticle.tags?.map(tag => ({
      id: tag?.id,
      tagName: tag?.tagName,
    })) || [],
    title: fullArticle.title,
    topic: fullArticle.topic?.map(item => ({
      id: item?.id,
      topicName: item?.topicName,
    })),
  };

  return articleSearchIndexItem;
};

export type UploadSearchIndexItem = Pick<UploadedFile, "id" | "originalFilename" | "userId" | "folderId" | "createdAt" | "fileExtension" | "contentType">;
export type UploadSearchItemNodes = RemoveUndefined<DotSeparatedKeys<UploadSearchIndexItem>>;
export type UploadSearchItemUpdate = Partial<Omit<UploadSearchIndexItem, "id" | "userId">> & Pick<UploadSearchIndexItem, "id">;

export const createUploadsSearchIndexItem = ({
  contentType,
  createdAt,
  fileExtension,
  folderId,
  id,
  originalFilename,
  userId
}: UploadSearchIndexItem): UploadSearchIndexItem =>
{
  return ({
    contentType,
    createdAt,
    fileExtension,
    folderId,
    id,
    originalFilename,
    userId
  });
};

export const uploadSearchIndexItemPrimaryKey: keyof UploadSearchIndexItem = "id";

export type DocumentSearchIndexItem = Pick<Document, "id" | "name" | "content" | "userId" | "folderId" | "updatedAt" | "createdAt">;
export type DocumentSearchItemNodes = RemoveUndefined<DotSeparatedKeys<DocumentSearchIndexItem>>;
export type DocumentSearchItemUpdate = Partial<Omit<DocumentSearchIndexItem, "id" | "userId">> & Pick<DocumentSearchIndexItem, "id">;

export const createDocumentSearchIndexItem = ({
  content,
  createdAt,
  folderId,
  id,
  name,
  updatedAt,
  userId
}: DocumentSearchIndexItem): DocumentSearchIndexItem =>
{
  return ({
    content: removeHtmlTagsFromString(content),
    createdAt,
    folderId,
    id,
    name,
    updatedAt,
    userId
  });
};

export const documentSearchIndexItemPrimaryKey: keyof DocumentSearchIndexItem = "id";
