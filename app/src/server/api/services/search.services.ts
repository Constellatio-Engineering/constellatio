import { db } from "@/db/connection";
import { searchIndexUpdateQueue, type SearchIndexUpdateQueueInsert, type UploadedFile } from "@/db/schema";
import { meiliSearchAdmin } from "@/lib/meilisearch";
import { getArticleById } from "@/services/content/getArticleById";
import { getCaseById } from "@/services/content/getCaseById";
import {
  type IGenGetAllArticlesByLegalAreaQuery, type IGenGetAllArticlesByMainCategoryQuery, type IGenGetAllArticlesByTagQuery,
  type IGenGetAllArticlesByTopicQuery, type IGenGetAllCasesByLegalAreaQuery, type IGenGetAllCasesByMainCategoryQuery, type IGenGetAllCasesByTagQuery,
  type IGenGetAllCasesByTopicQuery,
} from "@/services/graphql/__generated/sdk";
import {
  createArticleSearchIndexItem, createCaseSearchIndexItem, createUploadsSearchIndexItem, searchIndices, uploadSearchIndexItemPrimaryKey 
} from "@/utils/search";

export const addContentToSearchQueue = async (items: SearchIndexUpdateQueueInsert | SearchIndexUpdateQueueInsert[]): Promise<void> =>
{
  if(!items || (Array.isArray(items) && items.length === 0))
  {
    return;
  }

  const itemsArray = Array.isArray(items) ? items : [items];
  await db.insert(searchIndexUpdateQueue).values(itemsArray).onConflictDoNothing();
};

type AddArticlesAndCasesToSearchQueue = (params: {
  articles: IGenGetAllArticlesByTopicQuery | IGenGetAllArticlesByLegalAreaQuery | IGenGetAllArticlesByMainCategoryQuery | IGenGetAllArticlesByTagQuery;
  cases: IGenGetAllCasesByTopicQuery | IGenGetAllCasesByLegalAreaQuery | IGenGetAllCasesByMainCategoryQuery | IGenGetAllCasesByTagQuery;
}) => Promise<void>;

export const addArticlesAndCasesToSearchQueue: AddArticlesAndCasesToSearchQueue = async ({ articles, cases }) =>
{
  const articleIds: string[] = articles?.allArticle?.edges?.map(e => e?.node?.id).filter(Boolean) || [];
  const caseIds: string[] = cases?.allCase?.edges?.map(e => e?.node?.id).filter(Boolean) || [];

  await addContentToSearchQueue(articleIds.map(id => ({ cmsId: id, resourceType: "article" })));
  await addContentToSearchQueue(caseIds.map(id => ({ cmsId: id, resourceType: "case" })));
};

export const resetSearchIndex = async (): Promise<void> =>
{
  await meiliSearchAdmin.deleteIndexIfExists(searchIndices.cases);
  await meiliSearchAdmin.deleteIndexIfExists(searchIndices.userUploads);
  await meiliSearchAdmin.deleteIndexIfExists(searchIndices.articles);
};

type AddArticlesToSearchIndex = (params: { articleIds: string[] }) => Promise<{
  createArticlesIndexTaskId: number | undefined;
}>;

export const addArticlesToSearchIndex: AddArticlesToSearchIndex = async ({ articleIds }) =>
{
  let createArticlesIndexTaskId: number | undefined;

  if(articleIds.length > 0)
  {
    const fetchAllArticlesDetailsPromises = articleIds.map(async id => (await getArticleById({ id })).article);
    const allArticlesWithDetails = await Promise.all(fetchAllArticlesDetailsPromises);
    const allArticlesSearchIndexItems = allArticlesWithDetails.filter(Boolean).map(createArticleSearchIndexItem);
    const createArticlesIndexTask = await meiliSearchAdmin.index(searchIndices.articles).addDocuments(allArticlesSearchIndexItems);
    createArticlesIndexTaskId = createArticlesIndexTask.taskUid;
  }

  return { createArticlesIndexTaskId };
};

type AddCasesToSearchIndex = (params: { caseIds: string[] }) => Promise<{
  createCasesIndexTaskId: number | undefined;
}>;

export const addCasesToSearchIndex: AddCasesToSearchIndex = async ({ caseIds }) =>
{
  let createCasesIndexTaskId: number | undefined;

  if(caseIds.length > 0)
  {
    const fetchAllCasesDetailsPromises = caseIds.map(async id => (await getCaseById({ id })).legalCase);
    const allCasesWithDetails = await Promise.all(fetchAllCasesDetailsPromises);
    const allCasesSearchIndexItems = allCasesWithDetails.filter(Boolean).map(createCaseSearchIndexItem);
    const createCasesIndexTask = await meiliSearchAdmin.index(searchIndices.cases).addDocuments(allCasesSearchIndexItems);
    createCasesIndexTaskId = createCasesIndexTask.taskUid;
  }

  return { createCasesIndexTaskId };
};

type AddUserUploadsToSearchIndex = (params: { uploads: UploadedFile[] }) => Promise<{
  createUploadsIndexTaskId: number | undefined;
}>;

export const addUserUploadsToSearchIndex: AddUserUploadsToSearchIndex = async ({ uploads }) =>
{
  let createUploadsIndexTaskId: number | undefined;

  if(uploads.length > 0)
  {
    const allUserUploadsSearchIndexItems = uploads.map(createUploadsSearchIndexItem);
    const createUploadsIndexTask = await meiliSearchAdmin.index(searchIndices.userUploads).addDocuments(allUserUploadsSearchIndexItems, {
      primaryKey: uploadSearchIndexItemPrimaryKey
    });
    createUploadsIndexTaskId = createUploadsIndexTask.taskUid;
  }

  return { createUploadsIndexTaskId };
};