import type { UploadedFile } from "@/db/schema";

export type UploadSearchIndexItem = Pick<UploadedFile, "id" | "originalFilename" | "userId" | "folderId" | "createdAt" | "fileExtension" | "contentType">;
export type UploadSearchItemNodes = keyof UploadSearchIndexItem;
export type UploadSearchItemUpdate = Partial<Omit<UploadSearchIndexItem, "id" | "userId">> & Pick<UploadSearchIndexItem, "id">;

export const createUploadsSearchIndexItem = ({
  contentType,
  createdAt,
  fileExtension,
  folderId,
  id,
  originalFilename,
  userId
}: UploadSearchIndexItem): UploadSearchIndexItem =>
{
  return ({
    contentType,
    createdAt,
    fileExtension,
    folderId,
    id,
    originalFilename,
    userId
  });
};

export const uploadSearchIndexItemPrimaryKey: keyof UploadSearchIndexItem = "id";
