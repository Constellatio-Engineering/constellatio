/* eslint-disable max-lines,@typescript-eslint/explicit-function-return-type */

import { db } from "@/db/connection";
import {
  type Document,
  type ForumQuestion,
  type ForumQuestionToLegalField,
  type ForumQuestionToSubfield,
  type ForumQuestionToTopic,
  searchIndexUpdateQueue,
  type SearchIndexUpdateQueueInsert,
  type UploadedFile
} from "@/db/schema";
import { meiliSearchAdmin } from "@/lib/meilisearch";
import { getCaseById } from "@/services/content/getCaseById";
import {
  type IGenArticle, type IGenCase,
  type IGenGetAllArticlesByLegalAreaQuery, type IGenGetAllArticlesByMainCategoryQuery, type IGenGetAllArticlesByTagQuery,
  type IGenGetAllArticlesByTopicQuery, type IGenGetAllCasesByLegalAreaQuery, type IGenGetAllCasesByMainCategoryQuery, type IGenGetAllCasesByTagQuery,
  type IGenGetAllCasesByTopicQuery, type IGenLegalArea, type IGenMainCategory, type IGenSubCategory, type IGenTags, type IGenTopic,
} from "@/services/graphql/__generated/sdk";
import { type ArticleSearchIndexItem, articleSearchIndexItemPrimaryKey, createArticleSearchIndexItem } from "@/utils/search/caisy/article";
import { type CaseSearchIndexItem, caseSearchIndexItemPrimaryKey, createCaseSearchIndexItem } from "@/utils/search/caisy/case";
import { createLegalAreaSearchIndexItem, type LegalAreaSearchIndexItem, legalAreaSearchIndexItemPrimaryKey } from "@/utils/search/caisy/legalArea";
import { createMainCategorySearchIndexItem, type MainCategorySearchIndexItem, mainCategorySearchIndexItemPrimaryKey } from "@/utils/search/caisy/mainCategory";
import { createSubCategorySearchIndexItem, type SubCategorySearchIndexItem, subCategorySearchIndexItemPrimaryKey } from "@/utils/search/caisy/subCategory";
import { createTagSearchIndexItem, type TagSearchIndexItem, tagSearchIndexItemPrimaryKey } from "@/utils/search/caisy/tag";
import { createTopicSearchIndexItem, type TopicSearchIndexItem, topicSearchIndexItemPrimaryKey } from "@/utils/search/caisy/topic";
import { searchIndices } from "@/utils/search/search";

export const addContentToSearchQueue = async (items: SearchIndexUpdateQueueInsert | SearchIndexUpdateQueueInsert[]): Promise<void> =>
{
  if(!items || (Array.isArray(items) && items.length === 0))
  {
    return;
  }

  const itemsArray = Array.isArray(items) ? items : [items];
  await db.insert(searchIndexUpdateQueue).values(itemsArray).onConflictDoNothing();
};

export const resetSearchIndex = async (): Promise<void> =>
{
  await Promise.all(Object.values(searchIndices).map(async index => meiliSearchAdmin.deleteIndexIfExists(index)));
};

export const addArticlesToSearchIndex = async (articles: IGenArticle[]) =>
{
  let createArticlesIndexTaskId: number | undefined;

  if(articles.length > 0)
  {
    const allArticlesSearchIndexItems = articles.map(createArticleSearchIndexItem);
    const createArticlesIndexTask = await meiliSearchAdmin.index<ArticleSearchIndexItem>(searchIndices.articles).addDocuments(allArticlesSearchIndexItems, {
      primaryKey: articleSearchIndexItemPrimaryKey
    });
    createArticlesIndexTaskId = createArticlesIndexTask.taskUid;
  }

  return { createArticlesIndexTaskId };
};

export const addTagsToSearchIndex = async (tags: IGenTags[]) =>
{
  let createTagsIndexTaskId: number | undefined;

  if(tags.length > 0)
  {
    const allTagsSearchIndexItems = tags.map(createTagSearchIndexItem);
    const createTagsIndexTask = await meiliSearchAdmin.index<TagSearchIndexItem>(searchIndices.tags).addDocuments(allTagsSearchIndexItems, {
      primaryKey: tagSearchIndexItemPrimaryKey
    });
    createTagsIndexTaskId = createTagsIndexTask.taskUid;
  }

  return { createTagsIndexTaskId };
};

export const addCasesToSearchIndex = async (cases: IGenCase[]) =>
{
  let createCasesIndexTaskId: number | undefined;

  if(cases.length > 0)
  {
    const allCasesSearchIndexItems = cases.map(createCaseSearchIndexItem);
    const createCasesIndexTask = await meiliSearchAdmin.index<CaseSearchIndexItem>(searchIndices.cases).addDocuments(allCasesSearchIndexItems, {
      primaryKey: caseSearchIndexItemPrimaryKey
    });
    createCasesIndexTaskId = createCasesIndexTask.taskUid;
  }

  return { createCasesIndexTaskId };
};

export const addLegalAreasToSearchIndex = async (legalAreas: IGenLegalArea[]) =>
{
  let createLegalAreasIndexTaskId: number | undefined;

  if(legalAreas.length > 0)
  {
    const allLegalAreasSearchIndexItems = legalAreas.map(createLegalAreaSearchIndexItem);
    const createLegalAreasIndexTask = await meiliSearchAdmin.index<LegalAreaSearchIndexItem>(searchIndices.legalAreas).addDocuments(allLegalAreasSearchIndexItems, {
      primaryKey: legalAreaSearchIndexItemPrimaryKey
    });
    createLegalAreasIndexTaskId = createLegalAreasIndexTask.taskUid;
  }

  return { createLegalAreasIndexTaskId };
};

export const addMainCategoriesToSearchIndex = async (mainCategories: IGenMainCategory[]) =>
{
  let createMainCategoriesIndexTaskId: number | undefined;

  if(mainCategories.length > 0)
  {
    const allMainCategoriesSearchIndexItems = mainCategories.map(createMainCategorySearchIndexItem);
    const createMainCategoriesIndexTask = await meiliSearchAdmin.index<MainCategorySearchIndexItem>(searchIndices.mainCategories).addDocuments(allMainCategoriesSearchIndexItems, {
      primaryKey: mainCategorySearchIndexItemPrimaryKey
    });
    createMainCategoriesIndexTaskId = createMainCategoriesIndexTask.taskUid;
  }

  return { createMainCategoriesIndexTaskId };
};

export const addSubCategoriesToSearchIndex = async (subCategories: IGenSubCategory[]) =>
{
  let createSubCategoriesIndexTaskId: number | undefined;

  if(subCategories.length > 0)
  {
    const allSubCategoriesSearchIndexItems = subCategories.map(createSubCategorySearchIndexItem);
    const createSubCategoriesIndexTask = await meiliSearchAdmin.index<SubCategorySearchIndexItem>(searchIndices.subCategories).addDocuments(allSubCategoriesSearchIndexItems, {
      primaryKey: subCategorySearchIndexItemPrimaryKey
    });
    createSubCategoriesIndexTaskId = createSubCategoriesIndexTask.taskUid;
  }

  return { createSubCategoriesIndexTaskId };
};

export const addTopicsToSearchIndex = async (topics: IGenTopic[]) =>
{
  let createTopicsIndexTaskId: number | undefined;

  if(topics.length > 0)
  {
    const allTopicsSearchIndexItems = topics.map(createTopicSearchIndexItem);
    const createTopicsIndexTask = await meiliSearchAdmin.index<TopicSearchIndexItem>(searchIndices.topics).addDocuments(allTopicsSearchIndexItems, {
      primaryKey: topicSearchIndexItemPrimaryKey
    });
    createTopicsIndexTaskId = createTopicsIndexTask.taskUid;
  }

  return { createTopicsIndexTaskId };
};

/* type AddUserUploadsToSearchIndex = (params: {
  uploads: UploadedFile[];
}) => Promise<{
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
};*/

/* type AddUserDocumentsToSearchIndex = (params: {
  documents: Document[];
}) => Promise<{
  createDocumentsIndexTaskId: number | undefined;
}>;

export const addUserDocumentsToSearchIndex: AddUserDocumentsToSearchIndex = async ({ documents }) =>
{
  let createDocumentsIndexTaskId: number | undefined;

  if(documents.length > 0)
  {
    const allUserDocumentsSearchIndexItems = documents.map(createDocumentSearchIndexItem);
    const createDocumentsIndexTask = await meiliSearchAdmin.index(searchIndices.userDocuments).addDocuments(allUserDocumentsSearchIndexItems, {
      primaryKey: documentSearchIndexItemPrimaryKey
    });
    createDocumentsIndexTaskId = createDocumentsIndexTask.taskUid;
  }

  return { createDocumentsIndexTaskId };
};*/

/* type AddForumQuestionsToSearchIndex = (params: {
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
};*/
