import useNotes from "@/hooks/useNotes";
import useUploadedFiles from "@/hooks/useUploadedFiles";
import useMaterialsStore from "@/stores/materials.store";
import { type TrpcClientErrorBase } from "@/utils/types";

import { type Note } from "@/db/schema";
import { type GetUploadedFileResult } from "@/server/api/routers/uploads.router";

export type UploadedFileWithNote = GetUploadedFileResult & { note: Note | null };

type UseUploadedFilesWithNotes = () => {
  getFilesError: TrpcClientErrorBase;
  getNotesError: TrpcClientErrorBase;
  isGetFilesLoading: boolean;
  isGetNotesLoading: boolean;
  uploadedFilesWithNotesInAllFolders: UploadedFileWithNote[];
  uploadedFilesWithNotesInSelectedFolder: UploadedFileWithNote[];
};

const useUploadedFilesWithNotes: UseUploadedFilesWithNotes = () =>
{
  const selectedFolderId = useMaterialsStore(s => s.selectedFolderId);

  const { error: getFilesError, isLoading: isGetFilesLoading, uploadedFilesInAllFolders } = useUploadedFiles();
  const { error: getNotesError, isLoading: isGetNotesLoading, notesForFilesInAllFolders } = useNotes();

  const filesWithNotes: UploadedFileWithNote[] = uploadedFilesInAllFolders.map((file) => ({
    ...file,
    note: notesForFilesInAllFolders.find((note) => note.fileId === file.id) ?? null
  }));

  return {
    getFilesError,
    getNotesError,
    isGetFilesLoading,
    isGetNotesLoading,
    uploadedFilesWithNotesInAllFolders: filesWithNotes ?? [],
    uploadedFilesWithNotesInSelectedFolder: (selectedFolderId === undefined
      ? filesWithNotes
      : filesWithNotes.filter((file) => file.folderId === selectedFolderId)
    ) ?? []
  };
};

export default useUploadedFilesWithNotes;
