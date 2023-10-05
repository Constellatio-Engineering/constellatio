import { db } from "@/db/connection";
import { uploadedFiles } from "@/db/schema";
import { env } from "@/env.mjs";
import { cloudStorage } from "@/lib/cloud-storage";
import { getIndicesOfSucceededPromises, getItemsByIndices, removeItemsByIndices } from "@/utils/utils";

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

  const deleteFilesPromises = files.map(async file =>
  {
    return cloudStorage
      .bucket(env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME)
      .file(`${userId}/${file.serverFilename}`)
      .delete();
  });

  const cloudStorageDeleteResults = await Promise.allSettled(deleteFilesPromises);
  const indicesOfSuccessfulDeletions = getIndicesOfSucceededPromises(cloudStorageDeleteResults);
  const deletedFiles = getItemsByIndices<File>(files, indicesOfSuccessfulDeletions);

  if(deletedFiles.length === 0)
  {
    return;
  }

  await db.delete(uploadedFiles).where(and(
    eq(uploadedFiles.userId, userId),
    inArray(uploadedFiles.id, deletedFiles.map(f => f.id))
  ));
};
