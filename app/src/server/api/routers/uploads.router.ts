import { db } from "@/db/connection";
import { type UploadedFileInsert, uploadedFiles } from "@/db/schema";
import { env } from "@/env.mjs";
import { cloudStorage } from "@/lib/cloud-storage";
import { meiliSearchAdmin } from "@/lib/meilisearch";
import { addUploadSchema } from "@/schemas/uploads/addUpload.schema";
import { deleteUploadSchema } from "@/schemas/uploads/deleteUpload.schema";
import { getUploadedFilesSchema } from "@/schemas/uploads/getUploadedFiles.schema";
import { renameUploadedFile } from "@/schemas/uploads/renameUploadedFile.schema";
import { deleteFiles } from "@/server/api/services/uploads.services";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createUploadsSearchIndexItem, searchIndices, uploadSearchIndexItemPrimaryKey } from "@/utils/search";
import { BadFileError, FileTooLargeError, NotFoundError } from "@/utils/serverError";

import {
  and, desc, eq, inArray, isNull
} from "drizzle-orm";
import { type SQLWrapper } from "drizzle-orm";
import { z } from "zod";

export const uploadsRouter = createTRPCRouter({
  createSignedGetUrl: protectedProcedure
    .input(z.object({
      fileId: z.string(),
    }))
    .query(async ({ ctx: { userId }, input: { fileId } }) =>
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

      const [url] = await cloudStorage
        .bucket(env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME)
        .file(`${userId}/${file.serverFilename}`)
        .getSignedUrl({
          action: "read",
          expires: Date.now() + 15 * 60 * 1000,
          version: "v4",
        });

      return url;
    }),
  createSignedUploadUrl: protectedProcedure
    .input(z.object({
      contentType: z.string(),
      fileSizeInBytes: z.number().int().min(1),
      filename: z.string(),
    }))
    .mutation(async ({ ctx: { userId }, input: { contentType, filename, fileSizeInBytes } }) =>
    {
      const uploadFileSizeLimitInBytes = env.NEXT_PUBLIC_MAXIMUM_FILE_UPLOAD_SIZE_IN_MB * 1_000_000;

      if(fileSizeInBytes > uploadFileSizeLimitInBytes)
      {
        throw new FileTooLargeError();
      }

      const filenameWithoutSpaces = filename.replace(/\s/g, "-");
      const filenameWithTimestamp = `${Date.now()}-${filenameWithoutSpaces}`;

      const [url] = await cloudStorage
        .bucket(env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME)
        .file(`${userId}/${filenameWithTimestamp}`)
        .getSignedUrl({
          action: "write",
          contentType,
          expires: Date.now() + 5 * 60 * 1000, 
          extensionHeaders: {
            "content-length": fileSizeInBytes
          },
          version: "v4"
        });

      return ({
        serverFilename: filenameWithTimestamp,
        uploadUrl: url
      });
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
      else
      {
        queryConditions.push(isNull(uploadedFiles.folderId));
      }

      return db.query.uploadedFiles.findMany({
        orderBy: [desc(uploadedFiles.createdAt)],
        where: and(...queryConditions),
      });
    }),
  renameFile: protectedProcedure
    .input(renameUploadedFile)
    .mutation(async ({ ctx: { userId }, input: { id, newFilename } }) =>
    {
      await db.update(uploadedFiles).set({ originalFilename: newFilename }).where(and(
        eq(uploadedFiles.userId, userId),
        eq(uploadedFiles.id, id)
      ));
    }),
  saveFileToDatabase: protectedProcedure
    .input(addUploadSchema)
    .mutation(async ({ ctx: { userId }, input }) =>
    {
      const {
        fileSizeInBytes,
        folderId,
        id,
        originalFilename,
        serverFilename
      } = input;

      const fileExtension = serverFilename.split(".").pop();

      if(!fileExtension)
      {
        throw new BadFileError(new Error("File has no extension"));
      }

      const uploadInsert: UploadedFileInsert = {
        fileExtension,
        folderId,
        id,
        originalFilename,
        serverFilename,
        sizeInBytes: fileSizeInBytes,
        userId
      };

      const insertResult = await db.insert(uploadedFiles).values(uploadInsert).returning({ id: uploadedFiles.id });

      const searchIndexItem = createUploadsSearchIndexItem({
        ...uploadInsert,
        id: insertResult[0]!.id
      });

      const addUploadToIndexTask = await meiliSearchAdmin
        .index(searchIndices.userUploads)
        .addDocuments([searchIndexItem], { primaryKey: uploadSearchIndexItemPrimaryKey });

      const addUploadToIndexResult = await meiliSearchAdmin.waitForTask(addUploadToIndexTask.taskUid);

      if(addUploadToIndexResult.status !== "succeeded")
      {
        console.error("failed to add upload to index", addUploadToIndexResult);
      }
    })
});
