import { db } from "@/db/connection";
import { notes, uploadedFiles } from "@/db/schema";
import { env } from "@/env.mjs";
import { cloudStorage } from "@/lib/cloud-storage";
import { getIndicesOfSucceededPromises, getItemsByIndices } from "@/utils/utils";

import { and, eq, inArray } from "drizzle-orm";

type File = {
  id: string;
  serverFilename: string;
};

type DeleteFiles = (params: {
  files: File[];
  userId: string;
}) => Promise<void>;

export const deleteFiles: DeleteFiles = async ({ files, userId }) =>
{
  if(files.length === 0)
  {
    return;
  }

  const fileIds = files.map(file => file.id);
  const deleteFilesPromises = files.map(async file =>
  {
    return cloudStorage
      .bucket(env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME)
      .file(`${userId}/${file.serverFilename}`)
      .delete();
  });

  await Promise.allSettled(deleteFilesPromises);

  await db.delete(notes).where(and(
    eq(notes.userId, userId),
    inArray(notes.fileId, fileIds)
  ));

  await db.delete(uploadedFiles).where(and(
    eq(uploadedFiles.userId, userId),
    inArray(uploadedFiles.id, fileIds)
  ));
};
