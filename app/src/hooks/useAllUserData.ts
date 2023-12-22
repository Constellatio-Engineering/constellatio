import { type Document, type UploadedFile } from "@/db/schema";
import useDocuments from "@/hooks/useDocuments";
import useUploadedFiles from "@/hooks/useUploadedFiles"; 

export type AllUserData = Array<
(UploadedFile & { dataType: "file" }) |
(Document & { dataType: "document" })
>;

type UseAllUserData = () => {
  allUserData: AllUserData;
};

export const useAllUserData: UseAllUserData = () =>
{
  const { uploadedFilesInAllFolders } = useUploadedFiles();
  const { documentsInAllFolders } = useDocuments();

  const allUserData = [
    ...uploadedFilesInAllFolders.map((file) => ({ ...file, dataType: "file" }) as const),
    ...documentsInAllFolders.map((document) => ({ ...document, dataType: "document" }) as const)
  ]
    .filter(Boolean)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return { allUserData };
};
