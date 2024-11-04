import { type SearchIndex, searchIndices } from "@constellatio/db-to-search";

export const allGenderIdentifiers = ["male", "female", "diverse"] as const;
export type GenderIdentifier = typeof allGenderIdentifiers[number];

export const allOnboardingResults = ["skipped", "completed"] as const;
export type OnboardingResult = typeof allOnboardingResults[number];

export const allBookmarkResourceTypes = ["article", "case", "forumQuestion"] as const;
export type BookmarkResourceType = typeof allBookmarkResourceTypes[number];

export const allSearchIndexTypes = Object.values(searchIndices) as [SearchIndex, ...SearchIndex[]];
export type SearchIndexType = SearchIndex;

export const allCaisyWebhookEventTypes = ["upsert", "delete"] as const;
export type CaisyWebhookEventType = typeof allCaisyWebhookEventTypes[number];

export const allCaseProgressStates = ["not-started", "completing-tests", "solving-case", "completed"] as const;
export type CaseProgressState = typeof allCaseProgressStates[number];

export const allGameProgressStates = ["not-started", "completed"] as const;
export type GameProgressState = typeof allGameProgressStates[number];

export const allSubscriptionStatuses = ["active", "canceled", "incomplete", "incomplete_expired", "past_due", "trialing", "unpaid", "paused"] as const;
export type SubscriptionStatus = typeof allSubscriptionStatuses[number];

export const imageFileExtensions = ["jpg", "jpeg", "png"] as const;
export type ImageFileExtension = typeof imageFileExtensions[number];

export const imageFileMimeTypes = ["image/jpeg", "image/png"] as const;
export type ImageFileMimeType = typeof imageFileMimeTypes[number];

export const documentFileExtensions = ["pdf"] as const;
export type DocumentFileExtension = typeof documentFileExtensions[number];

export const documentFileMimeTypes = ["application/pdf"] as const;
export type DocumentFileMimeType = typeof documentFileMimeTypes[number];

export const fileExtensions = [...imageFileExtensions, ...documentFileExtensions] as const;
export type FileExtension = typeof fileExtensions[number];

export const fileMimeTypes = [...imageFileMimeTypes, ...documentFileMimeTypes] as const;
export type FileMimeType = typeof fileMimeTypes[number];

export const streakActivityTypes = ["time", "solvedCase", "forumActivity"] as const;
export type StreakActivityType = typeof streakActivityTypes[number];

export const contentItemViewsTypes = ["case", "article", "forumQuestion"] as const;
export type ContentItemViewType = typeof contentItemViewsTypes[number];

export const badgeIdentifiers = [
  "fall-1",
  "forum-power",
  "disziplin",
  "fall-profi-bgb-at",
  "forum-profi",
  "perfekte-woche",
  "fall-10",
  "1-100",
  "1-1000",
  "game-master-25",
  "fall-25",
  "dauerbrenner",
  "game-master-3",
  "fall-5",
  "entschlossenheit",
  "game-master-50",
  "lexikon-profi-bgb-at",
  "lexikon-profi-deliktsrecht",
  "lexikon-profi-sachenrecht",
  "lexikon-profi-bereicherungsrecht",
  "favorit",
  "power-user-allgemein",
  "forum-1",
  "feedback-1",
  "ugc-1",
  "forum-10",
  "feedback-10",
  "ugc-10",
  "forum-5",
  "feedback-5",
  "ugc-5",
  "streak-14",
  "streak-42",
  "streak-84"
] as const;
export type BadgeIdentifier = typeof badgeIdentifiers[number];

export const badgePublicationState = ["not-listed", "coming-soon", "published"] as const;
export type BadgePublicationState = typeof badgePublicationState[number];

export const userBadgeStates = ["not-seen", "seen"] as const;
export type UserBadgeState = typeof userBadgeStates[number];

export const roles = ["forumMod", "admin"] as const;
export type Role = typeof roles[number];

export const authProviders = ["email", "google", "linkedin_oidc"] as const;
export type AuthProvider = typeof authProviders[number];

export const notificationTypesIdentifiers = [
  "forumQuestionPosted",
  "answerToForumQuestionPosted",
  "forumQuestionUpvoted",
  "replyToForumAnswerPosted",
  "forumAnswerUpvoted",
  "forumAnswerAccepted",
] as const;

export const profilePictureSources = ["internal", "external"] as const;
export type ProfilePictureSource = typeof profilePictureSources[number];
