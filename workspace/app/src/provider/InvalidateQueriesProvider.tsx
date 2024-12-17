import { searchResultsQueryKey } from "@/hooks/useSearchResults";
import { api } from "@/utils/api";

import { type AppRouter } from "@constellatio/api";
import { useQueryClient } from "@tanstack/react-query";
import { type inferProcedureInput } from "@trpc/server";
import { createContext, type FunctionComponent, type ReactNode, useMemo } from "react";

type InvalidateDocumentsOptions = inferProcedureInput<AppRouter["documents"]["getDocuments"]>;
type InvalidateUploadedFilesOptions = inferProcedureInput<AppRouter["uploads"]["getUploadedFiles"]>;
type InvalidateFoldersOptions = inferProcedureInput<AppRouter["folders"]["getFolders"]>;
type InvalidateBookmarksOptions = inferProcedureInput<AppRouter["bookmarks"]["getAllBookmarks"]>;
type InvalidateContentItemsViewsCountOptions = inferProcedureInput<AppRouter["views"]["getContentItemViewsCount"]>;
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
type InvalidateAmountOfUnreadNotificationsOptions = inferProcedureInput<AppRouter["notifications"]["getAmountOfUnreadNotifications"]>;
type InvalidateNotificationOptions = inferProcedureInput<AppRouter["notifications"]["getNotificationById"]>;
type InvalidateNotificationsOptions = inferProcedureInput<AppRouter["notifications"]["getNotifications"]>;
type InvalidateSeenArticlesOptions = inferProcedureInput<AppRouter["views"]["getSeenArticles"]>;

type InvalidateQueries = {
  invalidateAmountOfUnreadNotifications: (options?: InvalidateAmountOfUnreadNotificationsOptions) => Promise<void>;
  invalidateBadges: (options?: InvalidateBadgesOptions) => Promise<void>;
  invalidateBookmarks: (options?: InvalidateBookmarksOptions) => Promise<void>;
  invalidateCaseProgress: (options?: InvalidateCaseProgressOptions) => Promise<void>;
  invalidateContentItemsViewsCount: (options: InvalidateContentItemsViewsCountOptions) => Promise<void>;
  invalidateDocuments: (options?: InvalidateDocumentsOptions) => Promise<void>;
  invalidateEverything: () => Promise<void>;
  invalidateFlashcard: (options?: InvalidateUserDetailsResultOptions) => Promise<void>;
  invalidateFlashcards: (options?: InvalidateUserDetailsResultOptions) => Promise<void>;
  invalidateFolders: (options?: InvalidateFoldersOptions) => Promise<void>;
  invalidateForumAnswer: (options: InvalidateForumAnswerOptions) => Promise<void>;
  invalidateForumAnswers: (options: InvalidateForumAnswersOptions) => Promise<void>;
  invalidateForumQuestion: (options: InvalidateForumQuestionOptions) => Promise<void>;
  invalidateForumQuestions: (options?: InvalidateForumQuestionsOptions) => Promise<void>;
  invalidateGamesProgress: (options: InvalidateGamesProgressOptions) => Promise<void>;
  invalidateNotes: () => Promise<void>;
  invalidateNotification: (options: InvalidateNotificationOptions) => Promise<void>;
  invalidateNotifications: (options?: InvalidateNotificationsOptions) => Promise<void>;
  invalidateOnboardingResult: (options?: InvalidateOnboardingResultOptions) => Promise<void>;
  invalidateSearchResults: (value?: string) => Promise<void>;
  invalidateSeenArticles: (options?: InvalidateSeenArticlesOptions) => Promise<void>;
  invalidateSubmittedCaseSolution: (options: InvalidateSubmittedCaseSolutionOptions) => Promise<void>;
  invalidateUploadedFiles: (options?: InvalidateUploadedFilesOptions) => Promise<void>;
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
    invalidateAmountOfUnreadNotifications: async (options) => apiContext.notifications.getAmountOfUnreadNotifications.invalidate(options),
    invalidateBadges: async (options) => apiContext.badges.getBadges.invalidate(options),
    invalidateBookmarks: async (options) => apiContext.bookmarks.getAllBookmarks.invalidate(options),
    invalidateCaseProgress: async (options) => apiContext.casesProgress.getCaseProgress.invalidate(options),
    invalidateContentItemsViewsCount: async (options) => apiContext.views.getContentItemViewsCount.invalidate(options),
    invalidateDocuments: async (options) => apiContext.documents.getDocuments.invalidate(options),
    invalidateEverything: async () => invalidateAll(),
    invalidateFolders: async (options) => apiContext.folders.getFolders.invalidate(options),
    invalidateForumAnswer: async (options) => apiContext.forum.getAnswerById.invalidate(options),
    invalidateForumAnswers: async (options) => apiContext.forum.getAnswers.invalidate(options),
    invalidateForumQuestion: async (options) => apiContext.forum.getQuestionById.invalidate(options),
    invalidateForumQuestions: async (options) => apiContext.forum.getQuestions.invalidate(options),
    invalidateGamesProgress: async (options) => apiContext.gamesProgress.getGamesProgress.invalidate(options),
    invalidateNotes: async () => apiContext.notes.getNotes.invalidate(),
    invalidateNotification: async (options) => apiContext.notifications.getNotificationById.invalidate(options),
    invalidateNotifications: async (options) => apiContext.notifications.getNotifications.invalidate(options),
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
    invalidateSeenArticles: async (options) => apiContext.views.getSeenArticles.invalidate(options),
    invalidateSubmittedCaseSolution: async (options) => apiContext.casesProgress.getSubmittedSolution.invalidate(options),
    invalidateUploadedFiles: async (options) => apiContext.uploads.getUploadedFiles.invalidate(options),
    invalidateUserDetails: async (options) => apiContext.users.getUserDetails.invalidate(options)
  }), [
    invalidateAll,
    apiContext.folders.getFolders,
    apiContext.views.getContentItemViewsCount,
    apiContext.documents.getDocuments,
    apiContext.bookmarks.getAllBookmarks,
    apiContext.badges.getBadges,
    apiContext.notes.getNotes,
    apiContext.notifications.getAmountOfUnreadNotifications,
    apiContext.notifications.getNotificationById,
    apiContext.notifications.getNotifications,
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
    apiContext.views.getSeenArticles,
    queryClient
  ]);

  return (
    <InvalidateQueriesContext.Provider value={invalidateQueries}>
      {children}
    </InvalidateQueriesContext.Provider>
  );
};

export default InvalidateQueriesProvider;
