import { and, eq, inArray } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { notes, uploadedFiles } from "@constellatio/db/schema";
import { env } from "@constellatio/env";
import { type UploadableFile } from "@constellatio/schemas/routers/uploads/createSignedUploadUrl.schema";
import { type FileExtension, type FileMimeType } from "@constellatio/shared/validation";

import { addUserToCrmUpdateQueue } from "../lib/clickup/utils";
import { cloudStorage } from "../lib/cloud-storage";

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

  await addUserToCrmUpdateQueue(userId);
};

type GetClouStorageFileUrl = (params: {
  serverFilename: string;
  staleTime: number;
  userId: string;
}) => Promise<string>;

export const getClouStorageFileUrl: GetClouStorageFileUrl = async ({ serverFilename, staleTime, userId }): Promise<string> =>
{
  const [url] = await cloudStorage
    .bucket(env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME)
    .file(`${userId}/${serverFilename}`)
    .getSignedUrl({
      action: "read",
      expires: Date.now() + staleTime,
      version: "v4",
    });

  return url;
};

type GetSignedCloudStorageUploadUrl = (params: {
  bucketType: "private" | "public";
  file: UploadableFile<FileExtension, FileMimeType>;
  userId: string;
}) => Promise<{
  serverFilename: string;
  uploadUrl: string;
}>;

export const getSignedCloudStorageUploadUrl: GetSignedCloudStorageUploadUrl = async ({ bucketType, file, userId }) =>
{
  const filenameWithoutSpaces = file.filename.replace(/\s/g, "-");
  const filenameWithTimestamp = `${Date.now()}-${filenameWithoutSpaces}`;

  const [url] = await cloudStorage
    .bucket(bucketType === "public" ? env.GOOGLE_CLOUD_STORAGE_PUBLIC_BUCKET_NAME : env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME)
    .file(`${userId}/${filenameWithTimestamp}`)
    .getSignedUrl({
      action: "write",
      contentType: file.contentType,
      expires: Date.now() + 5 * 60 * 1000,
      extensionHeaders: {
        "content-length": file.fileSizeInBytes,
      },
      version: "v4"
    });

  return ({
    serverFilename: filenameWithTimestamp,
    uploadUrl: url
  });
};
