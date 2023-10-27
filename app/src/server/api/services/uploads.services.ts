import { db } from "@/db/connection";
import { type FileExtension, type FileMimeType, notes, uploadedFiles } from "@/db/schema";
import { env } from "@/env.mjs";
import { cloudStorage } from "@/lib/cloud-storage";
import { type UploadableFile } from "@/schemas/uploads/createSignedUploadUrl.schema";

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

type GetClouStorageFileUrl = (params: {
  serverFilename: string;
  userId: string;
}) => Promise<string>;

export const getClouStorageFileUrl: GetClouStorageFileUrl = async ({ serverFilename, userId }): Promise<string> =>
{
  const [url] = await cloudStorage
    .bucket(env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME)
    .file(`${userId}/${serverFilename}`)
    .getSignedUrl({
      action: "read",
      expires: Date.now() + 15 * 60 * 1000,
      version: "v4",
    });

  return url;
};

type GetSignedCloudStorageUploadUrl = (params: {
  file: UploadableFile<FileExtension, FileMimeType>;
  userId: string;
}) => Promise<{
  serverFilename: string;
  uploadUrl: string;
}>;

export const getSignedCloudStorageUploadUrl: GetSignedCloudStorageUploadUrl = async ({ file, userId }) =>
{
  const filenameWithoutSpaces = file.filename.replace(/\s/g, "-");
  const filenameWithTimestamp = `${Date.now()}-${filenameWithoutSpaces}`;

  console.log("---------------");
  console.log("env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME", env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME);
  console.log("filenameWithTimestamp", filenameWithTimestamp);
  console.log("file.contentType", file.contentType);
  console.log("file.fileSizeInBytes", file.fileSizeInBytes);
  console.log("filename", `${userId}/${filenameWithTimestamp}`);

  const [url] = await cloudStorage
    .bucket(env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME)
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
