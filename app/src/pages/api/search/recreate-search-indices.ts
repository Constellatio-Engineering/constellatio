import { db } from "@/db/connection";
import { env } from "@/env.mjs";
import { meiliSearchAdmin } from "@/lib/meilisearch";
import { addUserUploadsToSearchIndex, resetSearchIndex, addArticlesToSearchIndex, addCasesToSearchIndex } from "@/server/api/services/search.services";
import getAllArticles from "@/services/content/getAllArticles";
import getAllCases from "@/services/content/getAllCases";
import { isDevelopmentOrStaging } from "@/utils/env";
import {
  type ArticleSearchItemNodes,
  type CaseSearchItemNodes,
  searchIndices,
  type UploadSearchItemNodes
} from "@/utils/search";

import { type NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) =>
{
  if(!isDevelopmentOrStaging)
  {
    console.warn("This endpoint is only available in development or staging mode. Current mode is '" + env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT + "'");
    return res.status(403).json({ message: "Forbidden" });
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

  const { createArticlesIndexTaskId } = await addArticlesToSearchIndex({
    articleIds: allArticles.map(a => a.id).filter(Boolean),
  });

  const { createCasesIndexTaskId } = await addCasesToSearchIndex({
    caseIds: allCases.map(c => c.id).filter(Boolean),
  });

  const { createUploadsIndexTaskId } = await addUserUploadsToSearchIndex({ uploads: allUserUploads });

  const createIndicesTasks = await meiliSearchAdmin.waitForTasks([
    createCasesIndexTaskId,
    createUploadsIndexTaskId,
    createArticlesIndexTaskId,
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

  // Displayed attributes
  const uploadsDisplayedAttributes: UploadSearchItemNodes[] = ["originalFilename", "id", "userId"];
  const updateUploadsDisplayedAttributesTask = await meiliSearchAdmin.index(searchIndices.userUploads).updateDisplayedAttributes(uploadsDisplayedAttributes);

  // Filterable attributes
  const casesFilterableAttributes: CaseSearchItemNodes[] = ["id"];
  const updateCasesFilterableAttributesTask = await meiliSearchAdmin.index(searchIndices.cases).updateFilterableAttributes(casesFilterableAttributes);

  const articlesFilterableAttributes: ArticleSearchItemNodes[] = ["id"];
  const updateArticlesFilterableAttributesTask = await meiliSearchAdmin.index(searchIndices.articles).updateFilterableAttributes(articlesFilterableAttributes);

  const uploadsFilterableAttributes: UploadSearchItemNodes[] = ["userId"];
  const updateUploadsFilterableAttributesTask = await meiliSearchAdmin.index(searchIndices.userUploads).updateFilterableAttributes(uploadsFilterableAttributes);

  await meiliSearchAdmin.waitForTasks([
    updateCasesRankingRulesTask.taskUid,
    updateArticlesRankingRulesTask.taskUid,
    updateUploadsRankingRulesTask.taskUid,
    updateUploadsDisplayedAttributesTask.taskUid,
    updateCasesFilterableAttributesTask.taskUid,
    updateArticlesFilterableAttributesTask.taskUid,
    updateUploadsFilterableAttributesTask.taskUid,
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
