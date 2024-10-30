/* eslint-disable max-lines */
import { env } from "@/env.mjs";

import { eq, inArray } from "drizzle-orm";
import { type NextApiHandler } from "next";

import { db } from "@/db/connection";
import { documents, searchIndexUpdateQueue, uploadedFiles } from "@/db/schema";
import { meiliSearchAdmin } from "@/lib/meilisearch";
import { addArticlesToSearchIndex, addCasesToSearchIndex, addUserDocumentsToSearchIndex, addUserUploadsToSearchIndex } from "@/server/api/services/search.services";
import getAllArticles from "@/services/content/getAllArticles";
import getAllCases from "@/services/content/getAllCases";
import { type AllTags, getAllTags } from "@/services/content/getAllTags";
import { searchIndices } from "@/utils/search";

type UpdateArticles = () => Promise<{
  createArticlesIndexTaskId: number | undefined;
  idsOfArticlesToUpdate: string[];
  removeDeletedArticlesTaskId: number | undefined;
}>;

const updateArticles: UpdateArticles = async () =>
{
  const articlesToUpdate = await db.select().from(searchIndexUpdateQueue).where(eq(searchIndexUpdateQueue.searchIndexType, "articles"));
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
  const casesToUpdate = await db.select().from(searchIndexUpdateQueue).where(eq(searchIndexUpdateQueue.searchIndexType, "cases"));
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

type UpdateUploadedFiles = (allTags: AllTags) => Promise<{
  createUploadedFilesIndexTaskId: number | undefined;
  idsOfUploadedFilesToUpdate: string[];
  removeDeletedUploadedFilesTaskId: number | undefined;
}>;

const updateUploadedFiles: UpdateUploadedFiles = async (allTags) =>
{
  const filesToUpdate = await db.select().from(searchIndexUpdateQueue).where(eq(searchIndexUpdateQueue.searchIndexType, "user-uploads"));
  const idsOfUploadedFilesToUpdate = filesToUpdate.map(file => file.cmsId);

  if(idsOfUploadedFilesToUpdate.length === 0)
  {
    console.log("No uploaded files to update");

    return ({
      createUploadedFilesIndexTaskId: undefined,
      idsOfUploadedFilesToUpdate,
      removeDeletedUploadedFilesTaskId: undefined,
    });
  }

  const deletedFiles = filesToUpdate.filter(file => file.eventType === "delete");
  const upsertedFiles = filesToUpdate.filter(file => file.eventType === "upsert");

  console.log(`Found ${(upsertedFiles.length)} files to upsert`);
  console.log(`Found ${deletedFiles.length} files to delete`);

  let removeDeletedUploadedFilesTaskId: number | undefined;

  if(deletedFiles.length > 0)
  {
    const removeDeletedFilesFromIndex = await meiliSearchAdmin.index(searchIndices.userUploads).deleteDocuments(deletedFiles.map((f) => f.cmsId));
    removeDeletedUploadedFilesTaskId = removeDeletedFilesFromIndex.taskUid;
  }

  const upsertedFilesWithTagsIds = await db.query.uploadedFiles.findMany({
    where: inArray(uploadedFiles.id, upsertedFiles.map(file => file.cmsId)),
    with: { tags: true },
  });

  const { createUploadsIndexTaskId } = await addUserUploadsToSearchIndex({
    allTags,
    uploads: upsertedFilesWithTagsIds
  });

  return ({
    createUploadedFilesIndexTaskId: createUploadsIndexTaskId,
    idsOfUploadedFilesToUpdate,
    removeDeletedUploadedFilesTaskId,
  });
};

type UpdateUserDocs = (allTags: AllTags) => Promise<{
  createUserDocsIndexTaskId: number | undefined;
  idsOfUserDocsToUpdate: string[];
  removeDeletedUserDocsTaskId: number | undefined;
}>;

const updateUserDocs: UpdateUserDocs = async (allTags) =>
{
  const docsToUpdate = await db.select().from(searchIndexUpdateQueue).where(eq(searchIndexUpdateQueue.searchIndexType, "user-documents"));
  const idsOfUserDocsToUpdate = docsToUpdate.map(doc => doc.cmsId);

  if(idsOfUserDocsToUpdate.length === 0)
  {
    console.log("No user docs to update");

    return ({
      createUserDocsIndexTaskId: undefined,
      idsOfUserDocsToUpdate,
      removeDeletedUserDocsTaskId: undefined,
    });
  }

  const deletedDocs = docsToUpdate.filter(doc => doc.eventType === "delete");
  const upsertedDocs = docsToUpdate.filter(doc => doc.eventType === "upsert");

  console.log(`Found ${(upsertedDocs.length)} user docs to upsert`);
  console.log(`Found ${deletedDocs.length} user docs to delete`);

  let removeDeletedUserDocsTaskId: number | undefined;

  if(deletedDocs.length > 0)
  {
    const removeDeletedDocsFromIndex = await meiliSearchAdmin.index(searchIndices.userDocuments).deleteDocuments(deletedDocs.map((d) => d.cmsId));
    removeDeletedUserDocsTaskId = removeDeletedDocsFromIndex.taskUid;
  }

  const upsertedDocsWithTagsIds = await db.query.documents.findMany({
    where: inArray(documents.id, upsertedDocs.map(doc => doc.cmsId)),
    with: { tags: true },
  });

  const { createDocumentsIndexTaskId } = await addUserDocumentsToSearchIndex({
    allTags,
    documents: upsertedDocsWithTagsIds
  });

  return ({
    createUserDocsIndexTaskId: createDocumentsIndexTaskId,
    idsOfUserDocsToUpdate,
    removeDeletedUserDocsTaskId,
  });
};

const handler: NextApiHandler = async (req, res): Promise<void> =>
{
  if(req.headers.authorization !== `Bearer ${env.CRON_SECRET}`)
  {
    return res.status(401).json({ message: "Unauthorized" });
  }

  console.log("----- [Cronjob] Update Search Indexes -----");

  const allTags = await getAllTags();

  const { createArticlesIndexTaskId, idsOfArticlesToUpdate, removeDeletedArticlesTaskId } = await updateArticles();
  const { createCasesIndexTaskId, idsOfCasesToUpdate, removeDeletedCasesTaskId } = await updateCases();
  const { createUploadedFilesIndexTaskId, idsOfUploadedFilesToUpdate, removeDeletedUploadedFilesTaskId } = await updateUploadedFiles(allTags);
  const { createUserDocsIndexTaskId, idsOfUserDocsToUpdate, removeDeletedUserDocsTaskId } = await updateUserDocs(allTags);

  const updatedEntitiesIds = [...idsOfArticlesToUpdate, ...idsOfCasesToUpdate, ...idsOfUploadedFilesToUpdate, ...idsOfUserDocsToUpdate];

  if(updatedEntitiesIds.length === 0)
  {
    return res.status(200).json({ message: "No entities to update" });
  }

  const indexTasks = await meiliSearchAdmin.waitForTasks([
    removeDeletedArticlesTaskId,
    removeDeletedCasesTaskId,
    removeDeletedUploadedFilesTaskId,
    removeDeletedUserDocsTaskId,
    createCasesIndexTaskId,
    createArticlesIndexTaskId,
    createUploadedFilesIndexTaskId,
    createUserDocsIndexTaskId,
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
    inArray(searchIndexUpdateQueue.cmsId, updatedEntitiesIds)
  );

  console.log("Search indexes updated successfully");

  return res.status(200).json({ message: "Search indexes updated" });
};

export default handler;
