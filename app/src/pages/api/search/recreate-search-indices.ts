import { db } from "@/db/connection";
import { env } from "@/env.mjs";
import { meiliSearchAdmin } from "@/lib/meilisearch";
import { getAllLegalFields, getAllSubCategories, getAllSubfields, getAllTopics } from "@/server/api/services/caisy.services";
import {
  addArticlesToSearchIndex,
  addCasesToSearchIndex, addLegalAreasToSearchIndex, addMainCategoriesToSearchIndex, addSubCategoriesToSearchIndex,
  addTagsToSearchIndex, addTopicsToSearchIndex,
  resetSearchIndex
} from "@/server/api/services/search.services";
import getAllArticles from "@/services/content/getAllArticles";
import getAllCases from "@/services/content/getAllCases";
import { getAllTags } from "@/services/content/getAllTags";
import { isDevelopment } from "@/utils/env";
import { type ArticleSearchItemNodes } from "@/utils/search/caisy/article";
import { type CaseSearchItemNodes } from "@/utils/search/caisy/case";
import { type LegalAreaSearchItemNodes } from "@/utils/search/caisy/legalArea";
import { MainCategorySearchIndexItem, type MainCategorySearchItemNodes } from "@/utils/search/caisy/mainCategory";
import { type SubCategorySearchItemNodes } from "@/utils/search/caisy/subCategory";
import { type TagSearchItemNodes } from "@/utils/search/caisy/tag";
import { type TopicSearchItemNodes } from "@/utils/search/caisy/topic";
import { searchIndices } from "@/utils/search/search";
import { type DocumentSearchItemNodes } from "@/utils/search/supabase/document";
import { type ForumQuestionSearchItemNodes } from "@/utils/search/supabase/forumQuestion";
import { type UploadSearchItemNodes } from "@/utils/search/supabase/upload";

import { type NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) =>
{
  if(!isDevelopment && (env.RECREATE_SEARCH_INDEX_SECRET !== req.query.secret))
  {
    console.warn("Invalid secret");
    return res.status(401).json({ message: "Unauthorized" });
  }

  if(req.method !== "POST")
  {
    return res.status(400).json({ message: "Invalid request method" });
  }

  console.log("Creating meilisearch index for cases. This may take a while...");

  await resetSearchIndex();

  const allArticles = await getAllArticles();
  const allCases = await getAllCases();
  const allTags = await getAllTags();
  const allTopics = await getAllTopics();
  const allLegalFields = await getAllLegalFields();
  const allSubCategories = await getAllSubCategories();
  const allSubfields = await getAllSubfields();

  /* const allUserUploads = await db.query.uploadedFiles.findMany();
  const allUsersDocuments = await db.query.documents.findMany();
  const allForumQuestions = await db.query.forumQuestions.findMany();
  const forumQuestionsToLegalFields = await db.query.forumQuestionsToLegalFields.findMany();
  const forumQuestionsToSubfields = await db.query.forumQuestionToSubfields.findMany();
  const forumQuestionsToTopics = await db.query.forumQuestionToTopics.findMany();*/

  const { createArticlesIndexTaskId } = await addArticlesToSearchIndex(allArticles);
  const { createCasesIndexTaskId } = await addCasesToSearchIndex(allCases);
  const { createTagsIndexTaskId } = await addTagsToSearchIndex(allTags);
  const { createTopicsIndexTaskId } = await addTopicsToSearchIndex(allTopics);
  const { createMainCategoriesIndexTaskId } = await addMainCategoriesToSearchIndex(allLegalFields);
  const { createSubCategoriesIndexTaskId } = await addSubCategoriesToSearchIndex(allSubCategories);
  const { createLegalAreasIndexTaskId } = await addLegalAreasToSearchIndex(allSubfields);

  // const { createUploadsIndexTaskId } = await addUserUploadsToSearchIndex({ uploads: allUserUploads });
  // const { createDocumentsIndexTaskId } = await addUserDocumentsToSearchIndex({ documents: allUsersDocuments });
  // const { createQuestionsIndexTaskId } = await addForumQuestionsToSearchIndex({
  //   allLegalFields,
  //   allSubfields,
  //   allTopics,
  //   forumQuestionsToLegalFields,
  //   forumQuestionsToSubfields,
  //   forumQuestionsToTopics,
  //   questions: allForumQuestions
  // });

  const createIndicesTasks = await meiliSearchAdmin.waitForTasks([
    createArticlesIndexTaskId,
    createCasesIndexTaskId,
    createTagsIndexTaskId,
    createTopicsIndexTaskId,
    createMainCategoriesIndexTaskId,
    createSubCategoriesIndexTaskId,
    createLegalAreasIndexTaskId,
    /* createUploadsIndexTaskId,
    createDocumentsIndexTaskId,
    createQuestionsIndexTaskId,*/
  ].filter(Boolean), {
    intervalMs: 1000,
    timeOutMs: 1000 * 60 * 5,
  });

  const failedCreateIndexTasks = createIndicesTasks.filter((t) => t.status !== "succeeded");

  if(failedCreateIndexTasks.length > 0)
  {
    console.error("Failed to create indices for " + failedCreateIndexTasks.map((t) => `'${t.indexUid}'`).join(", "), failedCreateIndexTasks);
    return res.status(500).json({ message: "Failed to create indices" });
  }

  console.log("Updating ranking rules for indices...");

  // Searchable attributes
  const articleSearchableAttributes: ArticleSearchItemNodes[] = ["title"];
  const updateArticlesRankingRulesTask = await meiliSearchAdmin.index(searchIndices.articles).updateSearchableAttributes(articleSearchableAttributes);

  const caseSearchableAttributes: CaseSearchItemNodes[] = ["title"];
  const updateCasesRankingRulesTask = await meiliSearchAdmin.index(searchIndices.cases).updateSearchableAttributes(caseSearchableAttributes);

  const tagsSearchableAttributes: TagSearchItemNodes[] = ["tagName"];
  const updateTagsRankingRulesTask = await meiliSearchAdmin.index(searchIndices.tags).updateSearchableAttributes(tagsSearchableAttributes);

  const topicsSearchableAttributes: TopicSearchItemNodes[] = ["topicName"];
  const updateTopicsRankingRulesTask = await meiliSearchAdmin.index(searchIndices.topics).updateSearchableAttributes(topicsSearchableAttributes);

  const mainCategoriesSearchableAttributes: MainCategorySearchItemNodes[] = ["mainCategory"];
  const updateMainCategoriesRankingRulesTask = await meiliSearchAdmin.index(searchIndices.mainCategories).updateSearchableAttributes(mainCategoriesSearchableAttributes);
  
  const subCategoriesSearchableAttributes: SubCategorySearchItemNodes[] = ["subCategory"];
  const updateSubCategoriesRankingRulesTask = await meiliSearchAdmin.index(searchIndices.subCategories).updateSearchableAttributes(subCategoriesSearchableAttributes);

  const legalAreasSearchableAttributes: LegalAreaSearchItemNodes[] = ["legalAreaName"];
  const updateLegalAreasRankingRulesTask = await meiliSearchAdmin.index(searchIndices.legalAreas).updateSearchableAttributes(legalAreasSearchableAttributes);

  /* const uploadsSearchableAttributes: UploadSearchItemNodes[] = ["originalFilename"];
  const updateUploadsRankingRulesTask = await meiliSearchAdmin.index(searchIndices.userUploads).updateSearchableAttributes(uploadsSearchableAttributes);

  const documentsSearchableAttributes: DocumentSearchItemNodes[] = ["name", "content"];
  const updateDocumentsRankingRulesTask = await meiliSearchAdmin.index(searchIndices.userDocuments).updateSearchableAttributes(documentsSearchableAttributes);

  const forumQuestionsSearchableAttributes: ForumQuestionSearchItemNodes[] = ["title", "text", "legalFields.name", "subfields.name", "topics.name"];
  const updateForumQuestionsRankingRulesTask = await meiliSearchAdmin.index(searchIndices.forumQuestions).updateSearchableAttributes(forumQuestionsSearchableAttributes);*/

  // Displayed attributes
  /* const uploadsDisplayedAttributes: UploadSearchItemNodes[] = ["originalFilename", "id", "userId", "createdAt", "folderId", "fileExtension", "contentType"];
  const updateUploadsDisplayedAttributesTask = await meiliSearchAdmin.index(searchIndices.userUploads).updateDisplayedAttributes(uploadsDisplayedAttributes);

  const documentsDisplayedAttributes: DocumentSearchItemNodes[] = ["name", "content", "id", "userId", "updatedAt", "createdAt", "folderId"];
  const updateDocumentsDisplayedAttributesTask = await meiliSearchAdmin.index(searchIndices.userDocuments).updateDisplayedAttributes(documentsDisplayedAttributes);*/

  // Filterable attributes
  const articlesFilterableAttributes: ArticleSearchItemNodes[] = ["id"];
  const updateArticlesFilterableAttributesTask = await meiliSearchAdmin.index(searchIndices.articles).updateFilterableAttributes(articlesFilterableAttributes);

  const casesFilterableAttributes: CaseSearchItemNodes[] = ["id"];
  const updateCasesFilterableAttributesTask = await meiliSearchAdmin.index(searchIndices.cases).updateFilterableAttributes(casesFilterableAttributes);

  const tagsFilterableAttributes: TagSearchItemNodes[] = ["id"];
  const updateTagsFilterableAttributesTask = await meiliSearchAdmin.index(searchIndices.tags).updateFilterableAttributes(tagsFilterableAttributes);

  const topicsFilterableAttributes: TopicSearchItemNodes[] = ["id"];
  const updateTopicsFilterableAttributesTask = await meiliSearchAdmin.index(searchIndices.topics).updateFilterableAttributes(topicsFilterableAttributes);

  const mainCategoriesFilterableAttributes: MainCategorySearchItemNodes[] = ["id"];
  const updateMainCategoriesFilterableAttributesTask = await meiliSearchAdmin.index(searchIndices.mainCategories).updateFilterableAttributes(mainCategoriesFilterableAttributes);

  const subCategoriesFilterableAttributes: SubCategorySearchItemNodes[] = ["id"];
  const updateSubCategoriesFilterableAttributesTask = await meiliSearchAdmin.index(searchIndices.subCategories).updateFilterableAttributes(subCategoriesFilterableAttributes);

  const legalAreasFilterableAttributes: LegalAreaSearchItemNodes[] = ["id"];
  const updateLegalAreasFilterableAttributesTask = await meiliSearchAdmin.index(searchIndices.legalAreas).updateFilterableAttributes(legalAreasFilterableAttributes);

  /* const uploadsFilterableAttributes: UploadSearchItemNodes[] = ["id", "userId", "folderId"];
  const updateUploadsFilterableAttributesTask = await meiliSearchAdmin.index(searchIndices.userUploads).updateFilterableAttributes(uploadsFilterableAttributes);

  const documentsFilterableAttributes: DocumentSearchItemNodes[] = ["id", "userId", "folderId"];
  const updateDocumentsFilterableAttributesTask = await meiliSearchAdmin.index(searchIndices.userDocuments).updateFilterableAttributes(documentsFilterableAttributes);

  const forumQuestionsFilterableAttributes: ForumQuestionSearchItemNodes[] = ["id", "userId"];
  const updateForumQuestionsFilterableAttributesTask = await meiliSearchAdmin.index(searchIndices.forumQuestions).updateFilterableAttributes(forumQuestionsFilterableAttributes);*/

  await meiliSearchAdmin.waitForTasks([
    updateArticlesFilterableAttributesTask.taskUid,
    updateArticlesRankingRulesTask.taskUid,
    updateCasesFilterableAttributesTask.taskUid,
    updateCasesRankingRulesTask.taskUid,
    updateTagsFilterableAttributesTask.taskUid,
    updateTagsRankingRulesTask.taskUid,
    updateTopicsFilterableAttributesTask.taskUid,
    updateTopicsRankingRulesTask.taskUid,
    updateMainCategoriesFilterableAttributesTask.taskUid,
    updateMainCategoriesRankingRulesTask.taskUid,
    updateSubCategoriesFilterableAttributesTask.taskUid,
    updateSubCategoriesRankingRulesTask.taskUid,
    updateLegalAreasFilterableAttributesTask.taskUid,
    updateLegalAreasRankingRulesTask.taskUid,
    // updateUploadsRankingRulesTask.taskUid,
    // updateForumQuestionsRankingRulesTask.taskUid,
    // updateForumQuestionsFilterableAttributesTask.taskUid,
    // updateUploadsDisplayedAttributesTask.taskUid,
    // updateUploadsFilterableAttributesTask.taskUid,
    // updateDocumentsRankingRulesTask.taskUid,
    // updateDocumentsDisplayedAttributesTask.taskUid,
    // updateDocumentsFilterableAttributesTask.taskUid,
  ], {
    intervalMs: 1000,
    timeOutMs: 1000 * 60 * 5,
  });

  const failedUpdateRankingRulesTasks = createIndicesTasks.filter((t) => t.status !== "succeeded");

  if(failedUpdateRankingRulesTasks.length > 0)
  {
    console.error("Failed to update rules for indices " + failedUpdateRankingRulesTasks.map((t) => `'${t.indexUid}'`).join(", "), failedUpdateRankingRulesTasks);
    return res.status(500).json({ message: "Failed to update rules for indices" });
  }

  console.log("Successfully set up search indices");
  return res.status(200).json({ message: "Success" });
};

export default handler;
