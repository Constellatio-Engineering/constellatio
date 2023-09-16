import { env } from "@/env.mjs";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { FileTooLargeError, InternalServerError } from "@/utils/serverError";

import { Storage } from "@google-cloud/storage";
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

      const [url] = await storage
        .bucket(env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME)
        .file(`${userId}/${Date.now()}-${filenameWithoutSpaces}`)
        .getSignedUrl({
          action: "write",
          contentType,
          expires: Date.now() + 5 * 60 * 1000, 
          extensionHeaders: {
            "content-length": fileSizeInBytes
          },
          // 5 minutes
          version: "v4"
        });

      return url;
    }),
});
