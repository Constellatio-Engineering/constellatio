/* eslint-disable max-lines */
import { type Document, type ForumQuestion, type UploadedFile } from "@acme/db/schema";
import {
  type FullLegalCase, type IGenArticle, type IGenLegalArea, type IGenMainCategory, type IGenTags, type IGenTopic
} from "@acme/cms";
import {
  type DotSeparatedKeys, type NullableProperties, type Prettify, type RemoveUndefined
} from "@acme/utility-types";
import { removeHtmlTagsFromString } from "@acme/utils";

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

export const createCaseSearchIndexItem = (fullCase: FullLegalCase): CaseSearchIndexItem =>
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

export const caseSearchIndexItemPrimaryKey: keyof CaseSearchIndexItem = "id";

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

export const articleSearchIndexItemPrimaryKey: keyof ArticleSearchIndexItem = "id";

export type UploadSearchIndexItem = Pick<UploadedFile, "id" | "originalFilename" | "userId" | "folderId" | "createdAt" | "fileExtension" | "contentType"> & {
  tags: Array<{
    id: IGenTags["id"];
    tagName: IGenTags["tagName"];
  }>;
};
export type UploadSearchItemNodes = RemoveUndefined<DotSeparatedKeys<UploadSearchIndexItem>>;
export type UploadSearchItemUpdate = Partial<Omit<UploadSearchIndexItem, "id" | "userId">> & Pick<UploadSearchIndexItem, "id">;

export const createUploadsSearchIndexItem = ({
                                               contentType,
                                               createdAt,
                                               fileExtension,
                                               folderId,
                                               id,
                                               originalFilename,
                                               tags,
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
    tags: tags.map(tag => ({
      id: tag.id,
      tagName: tag.tagName
    })),
    userId
  });
};

export const uploadSearchIndexItemPrimaryKey: keyof UploadSearchIndexItem = "id";

export type DocumentSearchIndexItem = Pick<Document, "id" | "name" | "content" | "userId" | "folderId" | "updatedAt" | "createdAt"> & {
  tags: Array<{
    id: IGenTags["id"];
    tagName: IGenTags["tagName"];
  }>;
};
export type DocumentSearchItemNodes = RemoveUndefined<DotSeparatedKeys<DocumentSearchIndexItem>>;
export type DocumentSearchItemUpdate = Partial<Omit<DocumentSearchIndexItem, "id" | "userId">> & Pick<DocumentSearchIndexItem, "id">;

export const createDocumentSearchIndexItem = ({
                                                content,
                                                createdAt,
                                                folderId,
                                                id,
                                                name,
                                                tags,
                                                updatedAt,
                                                userId
                                              }: DocumentSearchIndexItem): DocumentSearchIndexItem =>
{
  return ({
    content: removeHtmlTagsFromString(content, true),
    createdAt,
    folderId,
    id,
    name,
    tags: tags.map(tag => ({
      id: tag.id,
      tagName: tag.tagName
    })),
    updatedAt,
    userId
  });
};

export const documentSearchIndexItemPrimaryKey: keyof DocumentSearchIndexItem = "id";

export type TagSearchIndexItem = NullableProperties<{
  id: string;
  tagName: string;
}>;
export type TagSearchItemNodes = RemoveUndefined<DotSeparatedKeys<TagSearchIndexItem>>;
// export type TagSearchItemUpdate = TagSearchIndexItem;

export const createTagSearchIndexItem = ({ id, tagName }: IGenTags): TagSearchIndexItem =>
{
  return ({
    id,
    tagName
  });
};

export const tagSearchIndexItemPrimaryKey: keyof TagSearchIndexItem = "id";

export type ForumQuestionSearchIndexItem = Pick<ForumQuestion, "id" | "text" | "title" | "slug" | "userId"> & {
  legalFields: Array<{
    id: string;
    name: string;
  }>;
  subfields: Array<{
    id: string;
    name: string;
  }>;
  topics: Array<{
    id: string;
    name: string;
  }>;
};
export type ForumQuestionSearchItemNodes = RemoveUndefined<DotSeparatedKeys<ForumQuestionSearchIndexItem>>;
export type ForumQuestionSearchItemUpdate = Prettify<Partial<Omit<ForumQuestionSearchIndexItem, "id" | "userId">> & Pick<ForumQuestionSearchIndexItem, "id">>;

export const createForumQuestionSearchIndexItem = ({
                                                     id,
                                                     legalFields,
                                                     slug,
                                                     subfields,
                                                     text,
                                                     title,
                                                     topics,
                                                     userId
                                                   }: ForumQuestionSearchIndexItem): ForumQuestionSearchIndexItem =>
{
  return ({
    id,
    legalFields,
    slug,
    subfields,
    text: removeHtmlTagsFromString(text, true),
    title,
    topics,
    userId
  });
};

export const forumQuestionSearchIndexItemPrimaryKey: keyof ForumQuestionSearchIndexItem = "id";
