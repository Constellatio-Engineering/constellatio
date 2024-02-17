import { db } from "@/db/connection";
import { env } from "@/env.mjs";
import { meiliSearchAdmin } from "@/lib/meilisearch";
import { getAllLegalFields, getAllSubfields, getAllTopics } from "@/server/api/services/caisy.services";
import {
  addArticlesToSearchIndex,
  addCasesToSearchIndex,
  addForumQuestionsToSearchIndex,
  addUserDocumentsToSearchIndex,
  addUserUploadsToSearchIndex,
  resetSearchIndex
} from "@/server/api/services/search.services";
import getAllArticles from "@/services/content/getAllArticles";
import getAllCases from "@/services/content/getAllCases";
import { isDevelopment } from "@/utils/env";
import {
  type ArticleSearchItemNodes,
  type CaseSearchItemNodes,
  type DocumentSearchItemNodes,
  type ForumQuestionSearchItemNodes,
  searchIndices,
  type UploadSearchItemNodes
} from "@/utils/search";

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

  const allCases = await getAllCases();
  const allArticles = await getAllArticles();
  const allUserUploads = await db.query.uploadedFiles.findMany();
  const allUsersDocuments = await db.query.documents.findMany();
  const allForumQuestions = await db.query.forumQuestions.findMany();
  const allLegalFields = await getAllLegalFields();
  const allSubfields = await getAllSubfields();
  const allTopics = await getAllTopics();

  const { createArticlesIndexTaskId } = await addArticlesToSearchIndex({
    articleIds: allArticles.map(a => a.id).filter(Boolean),
  });

  const { createCasesIndexTaskId } = await addCasesToSearchIndex({
    caseIds: allCases.map(c => c.id).filter(Boolean),
  });

  const { createUploadsIndexTaskId } = await addUserUploadsToSearchIndex({ uploads: allUserUploads });
  const { createDocumentsIndexTaskId } = await addUserDocumentsToSearchIndex({ documents: allUsersDocuments });
  const { createQuestionsIndexTaskId } = await addForumQuestionsToSearchIndex({
    allLegalFields,
    allSubfields,
    allTopics,
    questions: allForumQuestions
  });

  const createIndicesTasks = await meiliSearchAdmin.waitForTasks([
    createCasesIndexTaskId,
    createUploadsIndexTaskId,
    createArticlesIndexTaskId,
    createDocumentsIndexTaskId,
    createQuestionsIndexTaskId,
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
  const caseSearchableAttributes: CaseSearchItemNodes[] = ["title", "legalArea.legalAreaName", "mainCategory.mainCategory", "tags.tagName"];
  const updateCasesRankingRulesTask = await meiliSearchAdmin.index(searchIndices.cases).updateSearchableAttributes(caseSearchableAttributes);

  const articleSearchableAttributes: ArticleSearchItemNodes[] = ["title", "legalArea.legalAreaName", "mainCategory.mainCategory", "tags.tagName"];
  const updateArticlesRankingRulesTask = await meiliSearchAdmin.index(searchIndices.articles).updateSearchableAttributes(articleSearchableAttributes);

  const uploadsSearchableAttributes: UploadSearchItemNodes[] = ["originalFilename"];
  const updateUploadsRankingRulesTask = await meiliSearchAdmin.index(searchIndices.userUploads).updateSearchableAttributes(uploadsSearchableAttributes);

  const documentsSearchableAttributes: DocumentSearchItemNodes[] = ["name", "content"];
  const updateDocumentsRankingRulesTask = await meiliSearchAdmin.index(searchIndices.userDocuments).updateSearchableAttributes(documentsSearchableAttributes);

  const forumQuestionsSearchableAttributes: ForumQuestionSearchItemNodes[] = ["title", "text", "legalFieldName", "subfieldName", "topicName"];
  const updateForumQuestionsRankingRulesTask = await meiliSearchAdmin.index(searchIndices.forumQuestions).updateSearchableAttributes(forumQuestionsSearchableAttributes);

  // Displayed attributes
  const uploadsDisplayedAttributes: UploadSearchItemNodes[] = ["originalFilename", "id", "userId", "createdAt", "folderId", "fileExtension", "contentType"];
  const updateUploadsDisplayedAttributesTask = await meiliSearchAdmin.index(searchIndices.userUploads).updateDisplayedAttributes(uploadsDisplayedAttributes);

  const documentsDisplayedAttributes: DocumentSearchItemNodes[] = ["name", "content", "id", "userId", "updatedAt", "createdAt", "folderId"];
  const updateDocumentsDisplayedAttributesTask = await meiliSearchAdmin.index(searchIndices.userDocuments).updateDisplayedAttributes(documentsDisplayedAttributes);

  // Filterable attributes
  const casesFilterableAttributes: CaseSearchItemNodes[] = ["id"];
  const updateCasesFilterableAttributesTask = await meiliSearchAdmin.index(searchIndices.cases).updateFilterableAttributes(casesFilterableAttributes);

  const articlesFilterableAttributes: ArticleSearchItemNodes[] = ["id"];
  const updateArticlesFilterableAttributesTask = await meiliSearchAdmin.index(searchIndices.articles).updateFilterableAttributes(articlesFilterableAttributes);

  const uploadsFilterableAttributes: UploadSearchItemNodes[] = ["id", "userId", "folderId"];
  const updateUploadsFilterableAttributesTask = await meiliSearchAdmin.index(searchIndices.userUploads).updateFilterableAttributes(uploadsFilterableAttributes);

  const documentsFilterableAttributes: DocumentSearchItemNodes[] = ["id", "userId", "folderId"];
  const updateDocumentsFilterableAttributesTask = await meiliSearchAdmin.index(searchIndices.userDocuments).updateFilterableAttributes(documentsFilterableAttributes);

  const forumQuestionsFilterableAttributes: ForumQuestionSearchItemNodes[] = ["id", "userId"];
  const updateForumQuestionsFilterableAttributesTask = await meiliSearchAdmin.index(searchIndices.forumQuestions).updateFilterableAttributes(forumQuestionsFilterableAttributes);

  await meiliSearchAdmin.waitForTasks([
    updateCasesRankingRulesTask.taskUid,
    updateArticlesRankingRulesTask.taskUid,
    updateUploadsRankingRulesTask.taskUid,
    updateForumQuestionsRankingRulesTask.taskUid,
    updateForumQuestionsFilterableAttributesTask.taskUid,
    updateUploadsDisplayedAttributesTask.taskUid,
    updateCasesFilterableAttributesTask.taskUid,
    updateArticlesFilterableAttributesTask.taskUid,
    updateUploadsFilterableAttributesTask.taskUid,
    updateDocumentsRankingRulesTask.taskUid,
    updateDocumentsDisplayedAttributesTask.taskUid,
    updateDocumentsFilterableAttributesTask.taskUid,
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
