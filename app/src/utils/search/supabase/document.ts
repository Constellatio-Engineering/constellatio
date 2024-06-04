import type { Document } from "@/db/schema";
import { removeHtmlTagsFromString } from "@/utils/utils";

export type DocumentSearchIndexItem = Pick<Document, "id" | "name" | "content" | "userId" | "folderId" | "updatedAt" | "createdAt">;
export type DocumentSearchItemNodes = keyof DocumentSearchIndexItem;
export type DocumentSearchItemUpdate = Partial<Omit<DocumentSearchIndexItem, "id" | "userId">> & Pick<DocumentSearchIndexItem, "id">;

export const createDocumentSearchIndexItem = ({
  content,
  createdAt,
  folderId,
  id,
  name,
  updatedAt,
  userId
}: DocumentSearchIndexItem): DocumentSearchIndexItem =>
{
  return ({
    content: removeHtmlTagsFromString(content, true),
    createdAt,
    folderId,
    id,
    name,
    updatedAt,
    userId
  });
};

export const documentSearchIndexItemPrimaryKey: keyof DocumentSearchIndexItem = "id";
