import { searchResultsQueryKey } from "@/hooks/useSearchResults";
import { type AppRouter } from "@/server/api/root";
import { api } from "@/utils/api";

import { useQueryClient } from "@tanstack/react-query";
import { type inferProcedureInput } from "@trpc/server";
import { createContext, type FunctionComponent, type ReactNode, useMemo } from "react";

type InvalidateDocumentsOptions = inferProcedureInput<AppRouter["documents"]["getDocuments"]>;
type InvalidateUploadedFilesOptions = inferProcedureInput<AppRouter["uploads"]["getUploadedFiles"]>;
type InvalidateFoldersOptions = inferProcedureInput<AppRouter["folders"]["getFolders"]>;
type InvalidateBookmarksOptions = inferProcedureInput<AppRouter["bookmarks"]["getAllBookmarks"]>;
type InvalidateNotesOptions = inferProcedureInput<AppRouter["notes"]["getNotes"]>;
type InvalidateArticleViewsOptions = inferProcedureInput<AppRouter["views"]["getArticleViews"]>;
type InvalidateCaseViewsOptions = inferProcedureInput<AppRouter["views"]["getCaseViews"]>;
type InvalidateCaseProgressOptions = inferProcedureInput<AppRouter["casesProgress"]["getCaseProgress"]>;
type InvalidateGamesProgressOptions = inferProcedureInput<AppRouter["gamesProgress"]["getGamesProgress"]>;
type InvalidateSubmittedCaseSolutionOptions = inferProcedureInput<AppRouter["casesProgress"]["getSubmittedSolution"]>;
type InvalidateOnboardingResult = inferProcedureInput<AppRouter["users"]["getOnboardingResult"]>;
type InvalidateUserDetailsResult = inferProcedureInput<AppRouter["users"]["getUserDetails"]>;

type InvalidateQueries = {
  invalidateArticleViews: (options: InvalidateArticleViewsOptions) => Promise<void>;
  invalidateBookmarks: (options?: InvalidateBookmarksOptions) => Promise<void>;
  invalidateCaseProgress: (options?: InvalidateCaseProgressOptions) => Promise<void>;
  invalidateCaseViews: (options: InvalidateCaseViewsOptions) => Promise<void>;
  invalidateDocuments: (options?: InvalidateDocumentsOptions) => Promise<void>;
  invalidateEverything: () => Promise<void>;
  invalidateFolders: (options?: InvalidateFoldersOptions) => Promise<void>;
  invalidateGamesProgress: (options: InvalidateGamesProgressOptions) => Promise<void>;
  invalidateNotes: (options?: InvalidateNotesOptions) => Promise<void>;
  invalidateOnboardingResult: (options?: InvalidateOnboardingResult) => Promise<void>;
  invalidateSearchResults: (value?: string) => Promise<void>;
  invalidateSubmittedCaseSolution: (options: InvalidateSubmittedCaseSolutionOptions) => Promise<void>;
  invalidateUploadedFiles: (options?: InvalidateUploadedFilesOptions) => Promise<void>;
  invalidateUserDetails: (options?: InvalidateUserDetailsResult) => Promise<void>;
};

export const InvalidateQueriesContext = createContext<InvalidateQueries | null>(null);

type InvalidateQueriesProviderProps = {
  readonly children: ReactNode;
};

const InvalidateQueriesProvider: FunctionComponent<InvalidateQueriesProviderProps> = ({ children }) =>
{
  const apiContext = api.useUtils();
  const queryClient = useQueryClient();
  const { invalidate: invalidateAll } = apiContext;

  const invalidateQueries: InvalidateQueries = useMemo(() => ({
    invalidateArticleViews: async (options) => apiContext.views.getArticleViews.invalidate(options),
    invalidateBookmarks: async (options) => apiContext.bookmarks.getAllBookmarks.invalidate(options),
    invalidateCaseProgress: async (options) => apiContext.casesProgress.getCaseProgress.invalidate(options),
    invalidateCaseViews: async (options) => apiContext.views.getCaseViews.invalidate(options),
    invalidateDocuments: async (options) => apiContext.documents.getDocuments.invalidate(options),
    invalidateEverything: async () => invalidateAll(),
    invalidateFolders: async (options) => apiContext.folders.getFolders.invalidate(options),
    invalidateGamesProgress: async (options) => apiContext.gamesProgress.getGamesProgress.invalidate(options),
    invalidateNotes: async (options) => apiContext.notes.getNotes.invalidate(options),
    invalidateOnboardingResult: async (options) => apiContext.users.getOnboardingResult.invalidate(options),
    invalidateSearchResults: async (value) => queryClient.invalidateQueries({ queryKey: [searchResultsQueryKey, value] }),
    invalidateSubmittedCaseSolution: async (options) => apiContext.casesProgress.getSubmittedSolution.invalidate(options),
    invalidateUploadedFiles: async (options) => apiContext.uploads.getUploadedFiles.invalidate(options),
    invalidateUserDetails: async (options) => apiContext.users.getUserDetails.invalidate(options)
  }), [
    invalidateAll,
    apiContext.folders.getFolders,
    apiContext.views.getArticleViews,
    apiContext.views.getCaseViews,
    apiContext.documents.getDocuments,
    apiContext.bookmarks.getAllBookmarks,
    apiContext.notes.getNotes,
    apiContext.uploads.getUploadedFiles,
    apiContext.casesProgress.getCaseProgress,
    apiContext.gamesProgress.getGamesProgress,
    apiContext.casesProgress.getSubmittedSolution,
    apiContext.users.getUserDetails,
    apiContext.users.getOnboardingResult,
    queryClient
  ]);

  return (
    <InvalidateQueriesContext.Provider value={invalidateQueries}>
      {children}
    </InvalidateQueriesContext.Provider>
  );
};

export default InvalidateQueriesProvider;
