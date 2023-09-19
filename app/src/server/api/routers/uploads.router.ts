import { db } from "@/db/connection";
import { uploadsTable } from "@/db/schema";
import { env } from "@/env.mjs";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { BadFileError, FileTooLargeError, NotFoundError } from "@/utils/serverError";
import { getFileNameWithoutExtension } from "@/utils/utils";

import { Storage } from "@google-cloud/storage";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";

const storage = new Storage({
  credentials: {
    client_email: env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    client_id: env.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID,
    private_key: env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
  },
  projectId: env.GOOGLE_CLOUD_STORAGE_PROJECT_ID,
});

export const uploadsRouter = createTRPCRouter({
  createSignedGetUrl: protectedProcedure
    .input(z.object({
      fileId: z.string(),
    }))
    .query(async ({ ctx: { userId }, input: { fileId } }) =>
    {
      const file = await db.query.uploadsTable.findFirst({
        where: and(
          eq(uploadsTable.userId, userId),
          eq(uploadsTable.uuid, fileId)
        )
      });

      if(!file)
      {
        throw new NotFoundError();
      }

      const [url] = await storage
        .bucket(env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME)
        .file(`${userId}/${file.filename + "." + file.fileExtension}`)
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

      const [url] = await storage
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
        filename: filenameWithTimestamp,
        uploadUrl: url
      });
    }),
  getUploadedFiles: protectedProcedure
    .query(async ({ ctx: { userId } }) =>
    {
      return db.query.uploadsTable.findMany({
        orderBy: [desc(uploadsTable.createdAt)],
        where: eq(uploadsTable.userId, userId)
      });
    }),
  saveFileToDatabase: protectedProcedure
    .input(z.object({
      clientSideUuid: z.string(),
      fileSizeInBytes: z.number().int().min(1),
      filename: z.string(),
      originalFilename: z.string(),
    }))
    .mutation(async ({
      ctx: {
        userId
      },
      input: {
        clientSideUuid,
        filename,
        fileSizeInBytes,
        originalFilename
      } 
    }) =>
    {
      const fileNameWithoutExtension = getFileNameWithoutExtension(filename);
      const originalFilenameWithoutExtension = getFileNameWithoutExtension(originalFilename);
      const fileExtension = filename.split(".").pop();

      if(!fileExtension)
      {
        throw new BadFileError(new Error("File has no extension"));
      }

      await db.insert(uploadsTable).values({
        clientSideUuid,
        fileExtension,
        filename: fileNameWithoutExtension,
        originalFilename: originalFilenameWithoutExtension,
        sizeInBytes: fileSizeInBytes,
        userId
      });
    })
});
