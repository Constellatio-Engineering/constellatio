import { defaultFolderName } from "@/utils/translations";

import { type UploadFolder } from "@/db/schema";

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
