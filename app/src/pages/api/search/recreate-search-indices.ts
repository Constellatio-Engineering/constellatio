import { db } from "@/db/connection";
import { env } from "@/env.mjs";
import { meiliSearchAdmin } from "@/meilisearch/client";
import getAllCases from "@/services/content/getAllCases";
import { getCaseById } from "@/services/content/getCaseById";
import {
  type CaseSearchItemNodes, createCaseSearchIndexItem, createUploadsSearchIndexItem, searchIndices, type UploadSearchItemNodes
} from "@/utils/search";

import { type NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) =>
{
  /**
   * TODO: Setting up the indices should be done in CI/CD
   */

  if(env.NEXT_PUBLIC_NODE_ENV !== "development")
  {
    return res.status(403).json({ details: "This endpoint is only available in development mode", message: "Forbidden" });
  }

  if(req.method !== "POST")
  {
    return res.status(400).json({ message: "Invalid request method" });
  }

  console.log("Creating meilisearch index for cases. This may take a while...");

  await meiliSearchAdmin.deleteIndexIfExists(searchIndices.cases);

  const allCases = await getAllCases();

  const fetchAllCasesDetailsPromises = allCases.map(async (c) =>
  {
    const { Case } = await getCaseById({ id: c.id! });
    return Case;
  });

  const allCasesWithDetails = await Promise.all(fetchAllCasesDetailsPromises);
  const allCasesSearchIndexItems = allCasesWithDetails.filter(Boolean).map(createCaseSearchIndexItem);
  const createCasesIndexTask = await meiliSearchAdmin.index(searchIndices.cases).addDocuments(allCasesSearchIndexItems);

  const allUserUploads = await db.query.uploadsTable.findMany();
  const allUserUploadsSearchIndexItems = allUserUploads.map(createUploadsSearchIndexItem);
  const createUploadsIndexTask = await meiliSearchAdmin.index(searchIndices.userUploads).addDocuments(allUserUploadsSearchIndexItems, { primaryKey: "uuid" });

  const createIndicesTasks = await meiliSearchAdmin.waitForTasks([
    createCasesIndexTask.taskUid,
    createUploadsIndexTask.taskUid,
  ], {
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

  const caseSearchableAttributes: CaseSearchItemNodes[] = ["title", "legalArea.legalAreaName", "mainCategory.mainCategory", "subCategory.subCategory", "tags.tagName"];
  const updateCasesRankingRulesTask = await meiliSearchAdmin.index(searchIndices.cases).updateSearchableAttributes(caseSearchableAttributes);

  const uploadsSearchableAttributes: UploadSearchItemNodes[] = ["originalFilename"];
  const updateUploadsRankingRulesTask = await meiliSearchAdmin.index(searchIndices.userUploads).updateSearchableAttributes(uploadsSearchableAttributes);

  const uploadsDisplayedAttributes: UploadSearchItemNodes[] = ["originalFilename", "uuid", "userId"];
  const updateUploadsDisplayedAttributesTask = await meiliSearchAdmin.index(searchIndices.userUploads).updateDisplayedAttributes(uploadsDisplayedAttributes);

  const uploadsFilterableAttributes: UploadSearchItemNodes[] = ["userId"];
  const updateUploadsFilterableAttributesTask = await meiliSearchAdmin.index(searchIndices.userUploads).updateFilterableAttributes(uploadsFilterableAttributes);

  await meiliSearchAdmin.waitForTasks([
    updateCasesRankingRulesTask.taskUid,
    updateUploadsRankingRulesTask.taskUid,
    updateUploadsDisplayedAttributesTask.taskUid,
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