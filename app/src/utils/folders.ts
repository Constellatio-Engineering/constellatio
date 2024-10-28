import { type UploadFolder } from "@/db/schema";
import { defaultFolderName } from "@/utils/translations";

export const getFolderName = (folderId: string | null, folders: UploadFolder[]): string =>
{
  if(folders.length === 0)
  {
    return "";
  }

  if(folderId === null)
  {
    return defaultFolderName;
  }

  return folders.length === 0 ? "" : folders.find(folder => folder.id === folderId)?.name ?? defaultFolderName;
};
