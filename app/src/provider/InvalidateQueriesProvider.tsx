import { type AppRouter } from "@/server/api/root";
import { api } from "@/utils/api";

import { type inferProcedureInput } from "@trpc/server";
import { createContext, type FunctionComponent, type ReactNode, useMemo } from "react";

type InvalidateDocumentsOptions = inferProcedureInput<AppRouter["documents"]["getDocuments"]>;
type InvalidateUploadedFilesOptions = inferProcedureInput<AppRouter["uploads"]["getUploadedFiles"]>;
type InvalidateFoldersOptions = inferProcedureInput<AppRouter["folders"]["getFolders"]>;
type InvalidateBookmarksOptions = inferProcedureInput<AppRouter["bookmarks"]["getAllBookmarks"]>;
type InvalidateNotesOptions = inferProcedureInput<AppRouter["notes"]["getNotes"]>;
type InvalidateArticleViewsOptions = inferProcedureInput<AppRouter["views"]["getArticleViews"]>;
type InvalidateCaseViewsOptions = inferProcedureInput<AppRouter["views"]["getCaseViews"]>;

type InvalidateQueries = {
  invalidateArticleViews: (options: InvalidateArticleViewsOptions) => Promise<void>;
  invalidateBookmarks: (options?: InvalidateBookmarksOptions) => Promise<void>;
  invalidateCaseViews: (options: InvalidateCaseViewsOptions) => Promise<void>;
  invalidateDocuments: (options?: InvalidateDocumentsOptions) => Promise<void>;
  invalidateEverything: () => Promise<void>;
  invalidateFolders: (options?: InvalidateFoldersOptions) => Promise<void>;
  invalidateNotes: (options?: InvalidateNotesOptions) => Promise<void>;
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

  const invalidateQueries: InvalidateQueries = useMemo(() => ({
    invalidateArticleViews: async (options) => apiContext.views.getArticleViews.invalidate(options),
    invalidateBookmarks: async (options) => apiContext.bookmarks.getAllBookmarks.invalidate(options),
    invalidateCaseViews: async (options) => apiContext.views.getCaseViews.invalidate(options),
    invalidateDocuments: async (options) => apiContext.documents.getDocuments.invalidate(options),
    invalidateEverything: async () => invalidateAll(),
    invalidateFolders: async (options) => apiContext.folders.getFolders.invalidate(options),
    invalidateNotes: async (options) => apiContext.notes.getNotes.invalidate(options),
    invalidateUploadedFiles: async (options) => apiContext.uploads.getUploadedFiles.invalidate(options)
  }), [
    invalidateAll,
    apiContext.folders.getFolders,
    apiContext.views.getArticleViews,
    apiContext.views.getCaseViews,
    apiContext.documents.getDocuments,
    apiContext.bookmarks.getAllBookmarks,
    apiContext.notes.getNotes,
    apiContext.uploads.getUploadedFiles
  ]);

  return (
    <InvalidateQueriesContext.Provider value={invalidateQueries}>
      {children}
    </InvalidateQueriesContext.Provider>
  );
};

export default InvalidateQueriesProvider;
