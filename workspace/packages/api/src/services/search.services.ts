/* eslint-disable max-lines */
import { meiliSearchAdmin } from "~/lib/meilisearch";

import { type AllTags } from "@constellatio/cms/content/getAllTags";
import { getArticleById } from "@constellatio/cms/content/getArticleById";
import { getCaseById } from "@constellatio/cms/content/getCaseById";
import {
  type IGenGetAllArticlesByLegalAreaQuery, type IGenGetAllArticlesByMainCategoryQuery, type IGenGetAllArticlesByTagQuery,
  type IGenGetAllArticlesByTopicQuery, type IGenGetAllCasesByLegalAreaQuery, type IGenGetAllCasesByMainCategoryQuery, type IGenGetAllCasesByTagQuery,
  type IGenGetAllCasesByTopicQuery,
  type IGenLegalArea,
  type IGenMainCategory,
  type IGenTags,
  type IGenTopic
} from "@constellatio/cms/generated-types";
import { db } from "@constellatio/db/client";
import {
  type DocumentWithTags,
  type ForumQuestion,
  type ForumQuestionToLegalField,
  type ForumQuestionToSubfield,
  type ForumQuestionToTopic,
  searchIndexUpdateQueue,
  type SearchIndexUpdateQueueInsert,
  type UploadedFileWithTags
} from "@constellatio/db/schema";
import { searchIndices } from "@constellatio/db-to-search";
import {
  type ArticleSearchIndexItem,
  articleSearchIndexItemPrimaryKey,
  caseSearchIndexItemPrimaryKey,
  createArticleSearchIndexItem,
  createCaseSearchIndexItem,
  createDocumentSearchIndexItem,
  createForumQuestionSearchIndexItem,
  createTagSearchIndexItem,
  createUploadsSearchIndexItem,
  documentSearchIndexItemPrimaryKey,
  type ForumQuestionSearchIndexItem,
  forumQuestionSearchIndexItemPrimaryKey,
  tagSearchIndexItemPrimaryKey,
  uploadSearchIndexItemPrimaryKey
} from "@constellatio/meilisearch/utils";
import { type CaisyWebhookEventType } from "@constellatio/shared/validation";

import { addTags } from "./tags.services";

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
  eventType: CaisyWebhookEventType;
}) => Promise<void>;

export const addArticlesAndCasesToSearchQueue: AddArticlesAndCasesToSearchQueue = async ({ articles, cases, eventType }) =>
{
  const articleIds: string[] = articles?.allArticle?.edges?.map(e => e?.node?.id).filter(Boolean) || [];
  const caseIds: string[] = cases?.allCase?.edges?.map(e => e?.node?.id).filter(Boolean) || [];

  await addContentToSearchQueue(articleIds.map(id => ({ cmsId: id, eventType, searchIndexType: "articles" })));
  await addContentToSearchQueue(caseIds.map(id => ({ cmsId: id, eventType, searchIndexType: "cases" })));
};

export const resetSearchIndex = async (): Promise<void> =>
{
  await Promise.all(Object.values(searchIndices).map(async index => meiliSearchAdmin.deleteIndexIfExists(index)));
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
    const createArticlesIndexTask = await meiliSearchAdmin.index<ArticleSearchIndexItem>(searchIndices.articles).addDocuments(allArticlesSearchIndexItems, {
      primaryKey: articleSearchIndexItemPrimaryKey
    });
    createArticlesIndexTaskId = createArticlesIndexTask.taskUid;
  }

  return { createArticlesIndexTaskId };
};

type AddTagsToSearchIndex = (params: { tags: IGenTags[] }) => Promise<{
  createTagsIndexTaskId: number | undefined;
}>;

export const addTagsToSearchIndex: AddTagsToSearchIndex = async ({ tags }) =>
{
  let createTagsIndexTaskId: number | undefined;

  if(tags.length > 0)
  {
    const allTagsSearchIndexItems = tags.map(createTagSearchIndexItem);
    const createTagsIndexTask = await meiliSearchAdmin.index(searchIndices.tags).addDocuments(allTagsSearchIndexItems, {
      primaryKey: tagSearchIndexItemPrimaryKey
    });
    createTagsIndexTaskId = createTagsIndexTask.taskUid;
  }

  return { createTagsIndexTaskId };
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
    const createCasesIndexTask = await meiliSearchAdmin.index(searchIndices.cases).addDocuments(allCasesSearchIndexItems, {
      primaryKey: caseSearchIndexItemPrimaryKey
    });
    createCasesIndexTaskId = createCasesIndexTask.taskUid;
  }

  return { createCasesIndexTaskId };
};

type AddUserUploadsToSearchIndex = (params: {
  allTags: AllTags;
  uploads: UploadedFileWithTags[];
}) => Promise<{
  createUploadsIndexTaskId: number | undefined;
}>;

export const addUserUploadsToSearchIndex: AddUserUploadsToSearchIndex = async ({ allTags, uploads }) =>
{
  const uploadsWithTags = await addTags(uploads, allTags);
  let createUploadsIndexTaskId: number | undefined;

  if(uploads.length > 0)
  {
    const allUserUploadsSearchIndexItems = uploadsWithTags.map(createUploadsSearchIndexItem);
    const createUploadsIndexTask = await meiliSearchAdmin.index(searchIndices.userUploads).addDocuments(allUserUploadsSearchIndexItems, {
      primaryKey: uploadSearchIndexItemPrimaryKey
    });
    createUploadsIndexTaskId = createUploadsIndexTask.taskUid;
  }

  return { createUploadsIndexTaskId };
};

type AddUserDocumentsToSearchIndex = (params: {
  allTags: AllTags;
  documents: DocumentWithTags[];
}) => Promise<{
  createDocumentsIndexTaskId: number | undefined;
}>;

export const addUserDocumentsToSearchIndex: AddUserDocumentsToSearchIndex = async ({ allTags, documents }) =>
{
  const documentsWithTags = await addTags(documents, allTags);
  let createDocumentsIndexTaskId: number | undefined;

  if(documents.length > 0)
  {
    const allUserDocumentsSearchIndexItems = documentsWithTags.map(createDocumentSearchIndexItem);
    const createDocumentsIndexTask = await meiliSearchAdmin.index(searchIndices.userDocuments).addDocuments(allUserDocumentsSearchIndexItems, {
      primaryKey: documentSearchIndexItemPrimaryKey
    });
    createDocumentsIndexTaskId = createDocumentsIndexTask.taskUid;
  }

  return { createDocumentsIndexTaskId };
};

type AddForumQuestionsToSearchIndex = (params: {
  allLegalFields: IGenMainCategory[];
  allSubfields: IGenLegalArea[];
  allTopics: IGenTopic[];
  forumQuestionsToLegalFields: ForumQuestionToLegalField[];
  forumQuestionsToSubfields: ForumQuestionToSubfield[];
  forumQuestionsToTopics: ForumQuestionToTopic[];
  questions: ForumQuestion[];
}) => Promise<{
  createQuestionsIndexTaskId: number | undefined;
}>;

export const addForumQuestionsToSearchIndex: AddForumQuestionsToSearchIndex = async ({
  allLegalFields,
  allSubfields,
  allTopics,
  forumQuestionsToLegalFields,
  forumQuestionsToSubfields,
  forumQuestionsToTopics,
  questions
}) =>
{
  let createQuestionsIndexTaskId: number | undefined;

  const questionsWithDetails: ForumQuestionSearchIndexItem[] = questions.map(question =>
  {
    const legalFields = forumQuestionsToLegalFields
      .filter((lf) => lf.questionId === question.id)
      .map((lf) => allLegalFields.find((field) => field.id === lf.legalFieldId))
      .filter(Boolean)
      .filter(lf => lf?.id && lf?.mainCategory)
      .map(lf => ({
        id: lf.id!,
        name: lf.mainCategory!
      }));

    const subfields = forumQuestionsToSubfields
      .filter((f) => f.questionId === question.id)
      .map((f) => allSubfields.find((subfield) => subfield.id === f.subfieldId))
      .filter(Boolean)
      .filter(sf => sf?.id && sf?.legalAreaName)
      .map(sf => ({
        id: sf.id!,
        name: sf.legalAreaName!
      }));

    const topics = forumQuestionsToTopics
      .filter((f) => f.questionId === question.id)
      .map((f) => allTopics.find((topic) => topic.id === f.topicId))
      .filter(Boolean)
      .filter(t => t?.id && t?.topicName)
      .map(t => ({
        id: t.id!,
        name: t.topicName!
      }));

    return {
      ...question,
      legalFields,
      subfields,
      topics
    };
  });

  if(questions.length > 0)
  {
    const allQuestionsSearchIndexItems = questionsWithDetails.map(createForumQuestionSearchIndexItem);
    const createForumQuestionsIndexTask = await meiliSearchAdmin.index(searchIndices.forumQuestions).addDocuments(allQuestionsSearchIndexItems, {
      primaryKey: forumQuestionSearchIndexItemPrimaryKey
    });
    createQuestionsIndexTaskId = createForumQuestionsIndexTask.taskUid;
  }

  return { createQuestionsIndexTaskId };
};
