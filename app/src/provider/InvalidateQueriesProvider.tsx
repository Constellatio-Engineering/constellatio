import { type AppRouter } from "@/server/api/root";
import { api } from "@/utils/api";

import { type inferProcedureInput } from "@trpc/server";
import { createContext, type FunctionComponent, type ReactNode, useMemo } from "react";

type InvalidateDocumentsOptions = inferProcedureInput<AppRouter["documents"]["getDocuments"]>;
type InvalidateUploadedFilesOptions = inferProcedureInput<AppRouter["uploads"]["getUploadedFiles"]>;
type InvalidateFoldersOptions = inferProcedureInput<AppRouter["folders"]["getFolders"]>;
type InvalidateBookmarksOptions = inferProcedureInput<AppRouter["bookmarks"]["getAllBookmarks"]>;

type InvalidateQueries = {
  invalidateBookmarks: (options?: InvalidateBookmarksOptions) => Promise<void>;
  invalidateDocuments: (options?: InvalidateDocumentsOptions) => Promise<void>;
  invalidateEverything: () => Promise<void>;
  invalidateFolders: (options?: InvalidateFoldersOptions) => Promise<void>;
  invalidateUploadedFiles: (options?: InvalidateUploadedFilesOptions) => Promise<void>;
};

export const InvalidateQueriesContext = createContext<InvalidateQueries | null>(null);

type InvalidateQueriesProviderProps = {
  readonly children: ReactNode;
};

const InvalidateQueriesProvider: FunctionComponent<InvalidateQueriesProviderProps> = ({ children }) =>
{
  const apiContext = api.useContext();
  const { invalidate: invalidateAll } = apiContext;

  console.log("[render] InvalidateQueriesProvider");

  const invalidateQueries: InvalidateQueries = useMemo(() =>
  {
    console.log("[useMemo] InvalidateQueriesProvider");

    return ({
      invalidateBookmarks: async (options) => apiContext.bookmarks.getAllBookmarks.invalidate(options),
      invalidateDocuments: async (options) => apiContext.documents.getDocuments.invalidate(options),
      invalidateEverything: async () => invalidateAll(),
      invalidateFolders: async (options) => apiContext.folders.getFolders.invalidate(options),
      invalidateUploadedFiles: async (options) => apiContext.uploads.getUploadedFiles.invalidate(options)
    });
  }, [
    invalidateAll,
    apiContext.documents.getDocuments,
    apiContext.bookmarks.getAllBookmarks,
    apiContext.uploads.getUploadedFiles
  ]);

  return (
    <InvalidateQueriesContext.Provider value={invalidateQueries}>
      {children}
    </InvalidateQueriesContext.Provider>
  );
};

export default InvalidateQueriesProvider;
