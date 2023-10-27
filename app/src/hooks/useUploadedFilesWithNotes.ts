import { type UploadedFileWithNote } from "@/db/schema";
import useNotes from "@/hooks/useNotes";
import useUploadedFiles from "@/hooks/useUploadedFiles";
import { type TrpcClientErrorBase } from "@/utils/types";

type UseUploadedFilesWithNotes = (folderId: string | null) => {
  getFilesError: TrpcClientErrorBase;
  getNotesError: TrpcClientErrorBase;
  isLoading: boolean;
  uploadedFilesWithNotes: UploadedFileWithNote[];
};

const useUploadedFilesWithNotes: UseUploadedFilesWithNotes = (folderId) =>
{
  const { error: getFilesError, isLoading: isGetFilesLoading, uploadedFiles } = useUploadedFiles(folderId);
  const { error: getNotesError, isLoading: isGetNotesLoading, notes } = useNotes(folderId);

  const filesWithNotes: UploadedFileWithNote[] = uploadedFiles.map((file) => ({
    ...file,
    note: notes.find((note) => note.fileId === file.id) ?? null
  }));

  return {
    getFilesError,
    getNotesError,
    isLoading: isGetFilesLoading || isGetNotesLoading,
    uploadedFilesWithNotes: filesWithNotes ?? []
  };
};

export default useUploadedFilesWithNotes;
