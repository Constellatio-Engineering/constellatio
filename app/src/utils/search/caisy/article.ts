import type { IGenArticle } from "@/services/graphql/__generated/sdk";
import type { Nullable } from "@/utils/types";
import { getIdsFromObjects } from "@/utils/utils";

export type ArticleSearchIndexItem = {
  id: Nullable<string>;
  legalAreaId: Nullable<string>;
  mainCategoryId: Nullable<string>;
  tagsIds: string[];
  title: Nullable<string>;
  topicsIds: string[];
};

export type ArticleSearchItemNodes = keyof ArticleSearchIndexItem;

export const createArticleSearchIndexItem = (fullArticle: IGenArticle): ArticleSearchIndexItem =>
{
  const articleSearchIndexItem: ArticleSearchIndexItem = {
    id: fullArticle.id,
    legalAreaId: fullArticle.legalArea?.id,
    mainCategoryId: fullArticle.mainCategoryField?.[0]?.id,
    tagsIds: getIdsFromObjects(fullArticle.tags),
    title: fullArticle.title,
    topicsIds: getIdsFromObjects(fullArticle.topic),
  };

  return articleSearchIndexItem;
};

export const articleSearchIndexItemPrimaryKey: ArticleSearchItemNodes = "id";
