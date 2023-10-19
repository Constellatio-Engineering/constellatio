import { db } from "@/db/connection";
import { searchIndexUpdateQueue } from "@/db/schema";
import { meiliSearchAdmin } from "@/lib/meilisearch";
import { addArticlesToSearchIndex, addCasesToSearchIndex } from "@/server/api/services/search.services";
import getAllArticles from "@/services/content/getAllArticles";
import getAllCases from "@/services/content/getAllCases";
import { searchIndices } from "@/utils/search";

import { eq, inArray } from "drizzle-orm";
import { type NextApiHandler } from "next";

type UpdateArticles = () => Promise<{
  createArticlesIndexTaskId: number | undefined;
  idsOfArticlesToUpdate: string[];
  removeDeletedArticlesTaskId: number | undefined;
}>;

const updateArticles: UpdateArticles = async () =>
{
  const articlesToUpdate = await db.select().from(searchIndexUpdateQueue).where(eq(searchIndexUpdateQueue.resourceType, "article"));
  const idsOfArticlesToUpdate = articlesToUpdate.map(article => article.cmsId);

  if(articlesToUpdate.length === 0)
  {
    console.log("No articles to update");

    return ({
      createArticlesIndexTaskId: undefined,
      idsOfArticlesToUpdate,
      removeDeletedArticlesTaskId: undefined,
    });
  }

  const allArticles = await getAllArticles();
  const deletedArticles = articlesToUpdate.filter((article) => !allArticles.some((a) => a.id === article.cmsId));

  console.log(`Found ${articlesToUpdate.length} articles to update`);
  console.log(`Found ${deletedArticles.length} articles to delete`);

  let removeDeletedArticlesTaskId: number | undefined;

  if(deletedArticles.length > 0)
  {
    const removeDeletedArticles = await meiliSearchAdmin.index(searchIndices.articles).deleteDocuments({
      filter: `id IN [${deletedArticles.map((c) => c.cmsId).join(", ")}]`
    });
    removeDeletedArticlesTaskId = removeDeletedArticles.taskUid;
  }

  const { createArticlesIndexTaskId } = await addArticlesToSearchIndex({
    articleIds: articlesToUpdate.map(article => article.cmsId),
  });

  return ({
    createArticlesIndexTaskId,
    idsOfArticlesToUpdate,
    removeDeletedArticlesTaskId
  });
};

type UpdateCases = () => Promise<{
  createCasesIndexTaskId: number | undefined;
  idsOfCasesToUpdate: string[];
  removeDeletedCasesTaskId: number | undefined;
}>;

const updateCases: UpdateCases = async () =>
{
  const casesToUpdate = await db.select().from(searchIndexUpdateQueue).where(eq(searchIndexUpdateQueue.resourceType, "case"));
  const idsOfCasesToUpdate = casesToUpdate.map(legalCase => legalCase.cmsId);

  if(casesToUpdate.length === 0)
  {
    console.log("No cases to update");

    return ({
      createCasesIndexTaskId: undefined,
      idsOfCasesToUpdate,
      removeDeletedCasesTaskId: undefined,
    });
  }

  const allCases = await getAllCases();
  const deletedCases = casesToUpdate.filter((legalCase) => !allCases.some((c) => c.id === legalCase.cmsId));

  console.log(`Found ${(casesToUpdate.length - deletedCases.length)} cases to update`);
  console.log(`Found ${deletedCases.length} cases to delete`);

  let removeDeletedCasesTaskId: number | undefined;

  if(deletedCases.length > 0)
  {
    const removeDeletedCasesFromIndex = await meiliSearchAdmin.index(searchIndices.cases).deleteDocuments({
      filter: `id IN [${deletedCases.map((a) => a.cmsId).join(", ")}]`
    });
    removeDeletedCasesTaskId = removeDeletedCasesFromIndex.taskUid;
  }

  const { createCasesIndexTaskId } = await addCasesToSearchIndex({
    caseIds: casesToUpdate.map(legalCase => legalCase.cmsId),
  });

  return ({
    createCasesIndexTaskId,
    idsOfCasesToUpdate,
    removeDeletedCasesTaskId,
  });
};

const handler: NextApiHandler = async (_req, res): Promise<void> =>
{
  console.log("----- [Cronjob] Update Search Indexes -----");

  const { createArticlesIndexTaskId, idsOfArticlesToUpdate, removeDeletedArticlesTaskId } = await updateArticles();
  const { createCasesIndexTaskId, idsOfCasesToUpdate, removeDeletedCasesTaskId } = await updateCases();

  const updatedCaseAndArticleIds = [...idsOfArticlesToUpdate, ...idsOfCasesToUpdate,];

  if(updatedCaseAndArticleIds.length === 0)
  {
    return res.status(200).json({ message: "No cases or articles to update" });
  }

  const indexTasks = await meiliSearchAdmin.waitForTasks([
    removeDeletedArticlesTaskId,
    removeDeletedCasesTaskId,
    createCasesIndexTaskId,
    createArticlesIndexTaskId,
  ].filter(Boolean), {
    intervalMs: 1000,
    timeOutMs: 1000 * 60 * 5,
  });

  const failedIndexTasks = indexTasks.filter((t) => t.status !== "succeeded");

  if(failedIndexTasks.length > 0)
  {
    console.error("Failed to create indices for " + failedIndexTasks.map((t) => `'${t.indexUid}'`).join(", "), failedIndexTasks);
    return res.status(500).json({ message: "Failed to create indices" });
  }

  await db.delete(searchIndexUpdateQueue).where(
    inArray(searchIndexUpdateQueue.cmsId, updatedCaseAndArticleIds)
  );

  console.log("Search indexes updated successfully for cases and articles.");

  return res.status(200).json({ message: "Search indexes updated" });
};

export default handler;
