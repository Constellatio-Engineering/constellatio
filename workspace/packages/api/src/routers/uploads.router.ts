/* eslint-disable max-lines */
import {
  and, desc, eq, inArray, isNull, type SQLWrapper 
} from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { type UploadedFileInsert, uploadedFiles } from "@constellatio/db/schema";
import { searchIndices } from "@constellatio/db-to-search";
import { createUploadsSearchIndexItem, uploadSearchIndexItemPrimaryKey, type UploadSearchItemUpdate } from "@constellatio/meilisearch/utils";
import { addUploadSchema } from "@constellatio/schemas/routers/uploads/addUpload.schema";
import { generateCreateSignedUploadUrlSchema } from "@constellatio/schemas/routers/uploads/createSignedUploadUrl.schema";
import { deleteUploadSchema } from "@constellatio/schemas/routers/uploads/deleteUpload.schema";
import { getUploadedFilesSchema } from "@constellatio/schemas/routers/uploads/getUploadedFiles.schema";
import { updateUploadedFileSchema } from "@constellatio/schemas/routers/uploads/updateUploadedFile.schema";
import { fileExtensions, fileMimeTypes } from "@constellatio/shared/validation";
import type { inferProcedureOutput } from "@trpc/server";
import { z } from "zod";

import { addUserToCrmUpdateQueue } from "../lib/clickup/utils";
import { meiliSearchAdmin } from "../lib/meilisearch";
import { addBadgeForUser } from "../services/badges.services";
import { addTags } from "../services/tags.services";
import { deleteFiles, getClouStorageFileUrl, getSignedCloudStorageUploadUrl } from "../services/uploads.services";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { NotFoundError } from "../utils/serverError";

export const uploadsRouter = createTRPCRouter({
  createSignedGetUrl: protectedProcedure
    .input(z.object({
      fileId: z.string(),
    }))
    .mutation(async ({ ctx: { userId }, input: { fileId } }) =>
    {
      const file = await db.query.uploadedFiles.findFirst({
        where: and(
          eq(uploadedFiles.userId, userId),
          eq(uploadedFiles.id, fileId)
        )
      });

      if(!file)
      {
        throw new NotFoundError();
      }

      return getClouStorageFileUrl({
        serverFilename: file.serverFilename,
        staleTime: 1000 * 60 * 15,
        userId
      });
    }),
  createSignedUploadUrl: protectedProcedure
    .input(generateCreateSignedUploadUrlSchema(fileExtensions, fileMimeTypes))
    .mutation(async ({ ctx: { userId }, input: file }) =>
    {
      return getSignedCloudStorageUploadUrl({ bucketType: "private", file, userId });
    }),
  deleteUploadedFiles: protectedProcedure
    .input(deleteUploadSchema)
    .mutation(async ({ ctx: { userId }, input: { fileIds } }) =>
    {
      const files = await db.query.uploadedFiles.findMany({
        where: and(
          eq(uploadedFiles.userId, userId),
          inArray(uploadedFiles.id, fileIds)
        )
      });

      await deleteFiles({ files, userId });

      const removeDeletedFilesFromIndex = await meiliSearchAdmin.index(searchIndices.userUploads).deleteDocuments(fileIds);
      const removeFileFromIndexResult = await meiliSearchAdmin.waitForTask(removeDeletedFilesFromIndex.taskUid);

      if(removeFileFromIndexResult.status !== "succeeded")
      {
        console.error("failed to remove file index", removeFileFromIndexResult);
      }
    }),
  getUploadedFiles: protectedProcedure
    .input(getUploadedFilesSchema)
    .query(async ({ ctx: { userId }, input: { folderId } }) =>
    {
      const queryConditions: SQLWrapper[] = [eq(uploadedFiles.userId, userId)];

      if(folderId)
      {
        queryConditions.push(eq(uploadedFiles.folderId, folderId));
      }
      else if(folderId === null)
      {
        queryConditions.push(isNull(uploadedFiles.folderId));
      }

      const uploadedFilesFromDb = await db.query.uploadedFiles.findMany({
        orderBy: [desc(uploadedFiles.createdAt)],
        where: and(...queryConditions),
        with: { tags: true },
      });

      const uploadedFilesWithTags = await addTags(uploadedFilesFromDb);
      return uploadedFilesWithTags;
    }),
  saveFileToDatabase: protectedProcedure
    .input(addUploadSchema)
    .mutation(async ({ ctx: { userId }, input }) =>
    {
      const {
        contentType,
        fileExtensionLowercase,
        fileSizeInBytes,
        folderId,
        id,
        originalFilename,
        serverFilename,
      } = input;

      const uploadInsert: UploadedFileInsert = {
        contentType,
        fileExtension: fileExtensionLowercase,
        folderId,
        id,
        originalFilename,
        serverFilename,
        sizeInBytes: fileSizeInBytes,
        userId
      };

      const insertResult = await db.insert(uploadedFiles).values(uploadInsert).returning();
      await addUserToCrmUpdateQueue(userId);

      await addBadgeForUser({ badgeIdentifier: "ugc-1", userId });

      const searchIndexItem = createUploadsSearchIndexItem({
        ...uploadInsert,
        createdAt: insertResult[0]!.createdAt,
        folderId: uploadInsert.folderId || null,
        id: insertResult[0]!.id,
        tags: []
      });

      const addUploadToIndexTask = await meiliSearchAdmin
        .index(searchIndices.userUploads)
        .addDocuments([searchIndexItem], { primaryKey: uploadSearchIndexItemPrimaryKey });

      const addUploadToIndexResult = await meiliSearchAdmin.waitForTask(addUploadToIndexTask.taskUid);

      if(addUploadToIndexResult.status !== "succeeded")
      {
        console.error("failed to add upload to index", addUploadToIndexResult);
      }
    }),
  updateFile: protectedProcedure
    .input(updateUploadedFileSchema)
    .mutation(async ({ ctx: { userId }, input: fileUpdate }) =>
    {
      const { id, updatedValues } = fileUpdate;

      const _updatedValues: Partial<UploadedFileInsert> = {
        folderId: updatedValues.folderId,
        originalFilename: updatedValues.name,
      };

      const updatedFile = await db.update(uploadedFiles)
        .set(_updatedValues)
        .where(and(
          eq(uploadedFiles.id, id),
          eq(uploadedFiles.userId, userId)
        ))
        .returning();

      const searchIndexUploadedFileUpdate: UploadSearchItemUpdate = {
        ..._updatedValues,
        id,
      };

      const updateFileInIndexTask = await meiliSearchAdmin.index(searchIndices.userUploads).updateDocuments([searchIndexUploadedFileUpdate]);
      const updateFileInIndexResult = await meiliSearchAdmin.waitForTask(updateFileInIndexTask.taskUid);

      if(updateFileInIndexResult.status !== "succeeded")
      {
        console.error("failed to update uploaded file in index", updateFileInIndexResult);
      }

      return updatedFile;
    })
});

export type GetUploadedFilesResult = inferProcedureOutput<typeof uploadsRouter.getUploadedFiles>;
export type GetUploadedFileResult = GetUploadedFilesResult[number];
