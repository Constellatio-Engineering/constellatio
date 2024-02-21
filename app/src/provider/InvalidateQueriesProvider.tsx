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
type InvalidateArticleViewsOptions = inferProcedureInput<AppRouter["views"]["getArticleViews"]>;
type InvalidateCaseViewsOptions = inferProcedureInput<AppRouter["views"]["getCaseViews"]>;
type InvalidateCaseProgressOptions = inferProcedureInput<AppRouter["casesProgress"]["getCaseProgress"]>;
type InvalidateGamesProgressOptions = inferProcedureInput<AppRouter["gamesProgress"]["getGamesProgress"]>;
type InvalidateSubmittedCaseSolutionOptions = inferProcedureInput<AppRouter["casesProgress"]["getSubmittedSolution"]>;
type InvalidateForumQuestionsOptions = inferProcedureInput<AppRouter["forum"]["getQuestions"]>;
type InvalidateForumQuestionOptions = inferProcedureInput<AppRouter["forum"]["getQuestionById"]>;
type InvalidateForumAnswersOptions = Partial<inferProcedureInput<AppRouter["forum"]["getAnswers"]>>;
type InvalidateForumAnswerOptions = inferProcedureInput<AppRouter["forum"]["getAnswerById"]>;
type InvalidateOnboardingResultOptions = inferProcedureInput<AppRouter["users"]["getOnboardingResult"]>;
type InvalidateUserDetailsResultOptions = inferProcedureInput<AppRouter["users"]["getUserDetails"]>;
type InvalidateBadgesOptions = inferProcedureInput<AppRouter["badges"]["getBadges"]>;

type InvalidateQueries = {
  invalidateArticleViews: (options: InvalidateArticleViewsOptions) => Promise<void>;
  invalidateBadges: (options?: InvalidateBadgesOptions) => Promise<void>;
  invalidateBookmarks: (options?: InvalidateBookmarksOptions) => Promise<void[]>;
  invalidateCaseProgress: (options?: InvalidateCaseProgressOptions) => Promise<void[]>;
  invalidateCaseViews: (options: InvalidateCaseViewsOptions) => Promise<void>;
  invalidateDocuments: (options?: InvalidateDocumentsOptions) => Promise<void>;
  invalidateEverything: () => Promise<void>;
  invalidateFolders: (options?: InvalidateFoldersOptions) => Promise<void>;
  invalidateForumAnswer: (options: InvalidateForumAnswerOptions) => Promise<void>;
  invalidateForumAnswers: (options: InvalidateForumAnswersOptions) => Promise<void>;
  invalidateForumQuestion: (options: InvalidateForumQuestionOptions) => Promise<void>;
  invalidateForumQuestions: (options?: InvalidateForumQuestionsOptions) => Promise<void>;
  invalidateGamesProgress: (options: InvalidateGamesProgressOptions) => Promise<void>;
  invalidateNotes: () => Promise<void>;
  invalidateOnboardingResult: (options?: InvalidateOnboardingResultOptions) => Promise<void>;
  invalidateSearchResults: (value?: string) => Promise<void>;
  invalidateSubmittedCaseSolution: (options: InvalidateSubmittedCaseSolutionOptions) => Promise<void>;
  invalidateUploadedFiles: (options?: InvalidateUploadedFilesOptions) => Promise<void[]>;
  invalidateUserDetails: (options?: InvalidateUserDetailsResultOptions) => Promise<void>;
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
    invalidateBadges: async (options) => apiContext.badges.getBadges.invalidate(options),
    invalidateBookmarks: async (options) => Promise.all([
      apiContext.badges.getBadges.invalidate(),
      apiContext.bookmarks.getAllBookmarks.invalidate(options)
    ]),
    invalidateCaseProgress: async (options) => Promise.all([
      apiContext.badges.getBadges.invalidate(),
      apiContext.casesProgress.getCaseProgress.invalidate(options),
    ]),
    invalidateCaseViews: async (options) => apiContext.views.getCaseViews.invalidate(options),
    invalidateDocuments: async (options) => apiContext.documents.getDocuments.invalidate(options),
    invalidateEverything: async () => invalidateAll(),
    invalidateFolders: async (options) => apiContext.folders.getFolders.invalidate(options),
    invalidateForumAnswer: async (options) => apiContext.forum.getAnswerById.invalidate(options),
    invalidateForumAnswers: async (options) => apiContext.forum.getAnswers.invalidate(options),
    invalidateForumQuestion: async (options) => apiContext.forum.getQuestionById.invalidate(options),
    invalidateForumQuestions: async (options) => apiContext.forum.getQuestions.invalidate(options),
    invalidateGamesProgress: async (options) => apiContext.gamesProgress.getGamesProgress.invalidate(options),
    invalidateNotes: async () => apiContext.notes.getNotes.invalidate(),
    invalidateOnboardingResult: async (options) => apiContext.users.getOnboardingResult.invalidate(options),
    invalidateSearchResults: async (value) =>
    {
      const queryKey = [searchResultsQueryKey];

      if(value)
      {
        queryKey.push(value);
      }

      await queryClient.invalidateQueries({ queryKey });
    },
    invalidateSubmittedCaseSolution: async (options) => apiContext.casesProgress.getSubmittedSolution.invalidate(options),
    invalidateUploadedFiles: async (options) => Promise.all([
      apiContext.badges.getBadges.invalidate(),
      apiContext.uploads.getUploadedFiles.invalidate(options),
    ]),
    invalidateUserDetails: async (options) => apiContext.users.getUserDetails.invalidate(options)
  }), [
    invalidateAll,
    apiContext.folders.getFolders,
    apiContext.views.getArticleViews,
    apiContext.views.getCaseViews,
    apiContext.documents.getDocuments,
    apiContext.bookmarks.getAllBookmarks,
    apiContext.badges.getBadges,
    apiContext.notes.getNotes,
    apiContext.forum.getQuestions,
    apiContext.forum.getAnswers,
    apiContext.forum.getAnswerById,
    apiContext.forum.getQuestionById,
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
