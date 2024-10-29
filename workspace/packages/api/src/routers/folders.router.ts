import { meiliSearchAdmin } from "~/lib/meilisearch";
import { deleteFiles } from "~/services/uploads.services";

import { and, asc, eq } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { documents, uploadedFiles, uploadFolders } from "@constellatio/db/schema";
import { searchIndices } from "@constellatio/db-to-search";
import { type DocumentSearchItemNodes, type UploadSearchItemNodes } from "@constellatio/meilisearch/utils";
import { createFolderSchema, deleteFolderSchema, renameFolderSchema } from "@constellatio/schemas";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const foldersRouter = createTRPCRouter({
  createFolder: protectedProcedure
    .input(createFolderSchema)
    .mutation(async ({ ctx: { userId }, input: { name } }) =>
    {
      await db.insert(uploadFolders).values({
        name,
        userId
      });
    }),
  deleteFolder: protectedProcedure
    .input(deleteFolderSchema)
    .mutation(async ({ ctx: { userId }, input: { folderId } }) =>
    {
      const files = await db.query.uploadedFiles.findMany({
        where: and(
          eq(uploadedFiles.userId, userId),
          eq(uploadedFiles.folderId, folderId)
        )
      });

      await Promise.all([
        deleteFiles({ files, userId }),
        db.delete(documents).where(
          and(
            eq(documents.userId, userId),
            eq(documents.folderId, folderId)
          )
        )
      ]);

      await db.delete(uploadFolders).where(
        and(
          eq(uploadFolders.userId, userId),
          eq(uploadFolders.id, folderId)
        )
      );

      const folderIdKey: DocumentSearchItemNodes & UploadSearchItemNodes = "folderId";

      const removeUploadsInFolderFromIndex = await meiliSearchAdmin.index(searchIndices.userUploads).deleteDocuments({
        filter: `${folderIdKey} = ${folderId}`
      });
      const removeDocumentsInFolderFromIndex = await meiliSearchAdmin.index(searchIndices.userDocuments).deleteDocuments({
        filter: `${folderIdKey} = ${folderId}`
      });

      const deleteContentInFolderTask = await meiliSearchAdmin.waitForTasks([
        removeUploadsInFolderFromIndex.taskUid,
        removeDocumentsInFolderFromIndex.taskUid,
      ].filter(Boolean), {
        intervalMs: 1000,
        timeOutMs: 1000 * 60 * 5,
      });

      const failedIndexTasks = deleteContentInFolderTask.filter((t) => t.status !== "succeeded");

      if(failedIndexTasks.length > 0)
      {
        console.error("Failed to delete content on folder for " + failedIndexTasks.map((t) => `'${t.indexUid}'`).join(", "), failedIndexTasks);
      }
    }),
  getFolders: protectedProcedure
    .query(async ({ ctx: { userId } }) =>
    {
      return db.query.uploadFolders.findMany({
        orderBy: [asc(uploadFolders.name)],
        where: eq(uploadFolders.userId, userId)
      });
    }),
  renameFolder: protectedProcedure
    .input(renameFolderSchema)
    .mutation(async ({ ctx: { userId }, input: { folderId, newName } }) =>
    {
      await db.update(uploadFolders).set({ name: newName }).where(
        and(
          eq(uploadFolders.userId, userId),
          eq(uploadFolders.id, folderId)
        )
      );
    })
});
