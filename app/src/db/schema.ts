/* eslint-disable sort-keys-fix/sort-keys-fix,@typescript-eslint/naming-convention,@typescript-eslint/no-use-before-define,max-lines */
import { type InferInsertModel, type InferSelectModel, relations } from "drizzle-orm";
import {
  text, pgTable, integer, pgEnum, uuid, smallint, unique, timestamp, primaryKey, index, type AnyPgColumn
} from "drizzle-orm/pg-core";

export const allGenderIdentifiers = ["male", "female", "diverse"] as const;
export type GenderIdentifier = typeof allGenderIdentifiers[number];

export const allOnboardingResults = ["skipped", "completed"] as const;
export type OnboardingResult = typeof allOnboardingResults[number];

export const allBookmarkResourceTypes = ["article", "case"] as const;
export type BookmarkResourceType = typeof allBookmarkResourceTypes[number];

export const allSearchIndexTypes = ["article", "case"] as const;
export type SearchIndexType = typeof allSearchIndexTypes[number];

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

const badgeIdentifiers = [
  "fall-1",
  "forum-power",
  "disziplin",
  "fall-profi-bgb-at",
  "forum-profi",
  "perfekte-woche",
  "fall-10",
  "1-100",
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
  "ugc-5"
] as const;
export type BadgeIdentifier = typeof badgeIdentifiers[number];

export const badgePublicationState = ["not-listed", "coming-soon", "published"] as const;
export type BadgePublicationState = typeof badgePublicationState[number];

export const userBadgeStates = ["not-seen", "seen"] as const;
export type UserBadgeState = typeof userBadgeStates[number];

export const genderEnum = pgEnum("Gender", allGenderIdentifiers);
export const onboardingResultEnum = pgEnum("OnboardingResult", allOnboardingResults);
export const resourceTypeEnum = pgEnum("ResourceType", allBookmarkResourceTypes);
export const searchIndexTypeEnum = pgEnum("SearchIndexType", allSearchIndexTypes);
export const caseProgressStateEnum = pgEnum("CaseProgressState", allCaseProgressStates);
export const gameProgressStateEnum = pgEnum("GameProgressState", allGameProgressStates);
export const subscriptionStatusEnum = pgEnum("SubscriptionStatus", allSubscriptionStatuses);
export const imageFileExtensionEnum = pgEnum("ImageFileExtension", imageFileExtensions);
export const imageFileMimeTypeEnum = pgEnum("ImageFileMimeType", imageFileMimeTypes);
export const documentFileExtensionEnum = pgEnum("DocumentFileExtension", documentFileExtensions);
export const documentFileMimeTypeEnum = pgEnum("DocumentFileMimeType", documentFileMimeTypes);
export const fileExtensionEnum = pgEnum("FileExtension", fileExtensions);
export const fileMimeTypeEnum = pgEnum("FileMimeType", fileMimeTypes);
export const badgeIdentifierEnum = pgEnum("BadgeIdentifier", badgeIdentifiers);
export const userBadgeStateEnum = pgEnum("UserBadgeState", userBadgeStates);
export const badgePublicationStateEnum = pgEnum("BadgePublicationState", badgePublicationState);

// TODO: Go through all queries and come up with useful indexes

export const users = pgTable("User", {
  id: uuid("Id").unique().notNull().primaryKey(),
  email: text("Email").unique().notNull(),
  displayName: text("DisplayName").notNull(),
  firstName: text("FirstName").notNull(),
  gender: genderEnum("Gender"),
  lastName: text("LastName").notNull(),
  semester: smallint("Semester"),
  stripeCustomerId: text("StripeCustomerId"),
  university: text("University"),
  onboardingResult: onboardingResultEnum("OnboardingResult"),
  subscriptionStatus: subscriptionStatusEnum("SubscriptionStatus"),
  subscriptionStartDate: timestamp("SubscriptionStartDate"),
  subscriptionEndDate: timestamp("SubscriptionEndDate"),
  trialSubscriptionId: text("TrialSubscriptionId"),
  subscriptionId: text("SubscriptionId"),
});

export const usersRelations = relations(users, ({ many }) => ({
  profilePictures: many(profilePictures),
  usersToBadges: many(usersToBadges),
}));

export type UserInsert = InferInsertModel<typeof users>;
export type User = InferSelectModel<typeof users>;

export const profilePictures = pgTable("ProfilePicture", {
  id: uuid("Id").unique().notNull().primaryKey(),
  serverFilename: text("ServerFilename").notNull(),
  fileExtension: imageFileExtensionEnum("FileExtension").notNull(),
  contentType: imageFileMimeTypeEnum("ContentType").notNull(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull().unique(),
});

export const profilePicturesRelations = relations(profilePictures, ({ one }) => ({
  user: one(users, {
    fields: [profilePictures.userId],
    references: [users.id],
  }),
}));

export type ProfilePictureInsert = InferInsertModel<typeof profilePictures>;
export type ProfilePicture = InferSelectModel<typeof profilePictures>;

export const bookmarks = pgTable("Bookmark", {
  id: uuid("Id").defaultRandom().unique().notNull().primaryKey(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  resourceType: resourceTypeEnum("ResourceType").notNull(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  resourceId: uuid("ResourceId").notNull()
}, table => ({
  unq: unique().on(table.resourceType, table.resourceId, table.userId),
}));

export type BookmarkInsert = InferInsertModel<typeof bookmarks>;
export type Bookmark = InferSelectModel<typeof bookmarks>;

export const uploadFolders = pgTable("UploadFolder", {
  id: uuid("Id").defaultRandom().unique().notNull().primaryKey(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  name: text("Name").notNull()
});

export type UploadFolderInsert = InferInsertModel<typeof uploadFolders>;
export type UploadFolder = InferSelectModel<typeof uploadFolders>;

export const uploadedFiles = pgTable("UploadedFile", {
  id: uuid("Id").defaultRandom().unique().notNull().primaryKey(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  folderId: uuid("FolderId").references(() => uploadFolders.id, { onDelete: "no action" }),
  serverFilename: text("ServerFilename").notNull(),
  originalFilename: text("OriginalFilename").notNull(),
  sizeInBytes: integer("SizeInBytes").notNull(),
  fileExtension: fileExtensionEnum("FileExtension").notNull(),
  contentType: fileMimeTypeEnum("ContentType").notNull(),
});

export type UploadedFileInsert = InferInsertModel<typeof uploadedFiles>;
export type UploadedFile = InferSelectModel<typeof uploadedFiles>;
export type UploadedFileWithNote = UploadedFile & { note: Note | null };

export const documents = pgTable("Document", {
  id: uuid("Id").defaultRandom().unique().notNull().primaryKey(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  updatedAt: timestamp("UpdatedAt").defaultNow().notNull(),
  folderId: uuid("FolderId").references(() => uploadFolders.id, { onDelete: "no action" }),
  name: text("Name").notNull(),
  content: text("Content").notNull(),
});

export type DocumentInsert = InferInsertModel<typeof documents>;
export type Document = InferSelectModel<typeof documents>;

export const notes = pgTable("Note", {
  id: uuid("Id").defaultRandom().unique().notNull().primaryKey(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  fileId: uuid("FileId").references(() => uploadedFiles.id, { onDelete: "no action" }).notNull(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  updatedAt: timestamp("UpdatedAt").defaultNow().notNull(),
  content: text("Content").notNull(),
});

export type NoteInsert = InferInsertModel<typeof notes>;
export type Note = InferSelectModel<typeof notes>;

export const casesViews = pgTable("CaseView", {
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  caseId: uuid("CaseId").notNull(),
  updatedAt: timestamp("UpdatedAt").defaultNow(),
}, table => ({
  caseIdIndex: index("CaseId_Index").on(table.caseId),
  pk: primaryKey({ columns: [table.userId, table.caseId] }),
}));

export type CaseViewInsert = InferInsertModel<typeof casesViews>;
export type CaseView = InferSelectModel<typeof casesViews>;

export const articlesViews = pgTable("ArticleView", {
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  articleId: uuid("ArticleId").notNull(),
  updatedAt: timestamp("UpdatedAt").defaultNow(),
}, table => ({
  articleIdIndex: index("ArticleId_Index").on(table.articleId),
  pk: primaryKey({ columns: [table.userId, table.articleId] }),
}));

export type ArticleViewInsert = InferInsertModel<typeof articlesViews>;
export type ArticleView = InferSelectModel<typeof articlesViews>;

export const casesProgress = pgTable("CaseProgress", {
  caseId: uuid("CaseId").notNull(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  progressState: caseProgressStateEnum("ProgressState").notNull().default("not-started"),
}, table => ({
  caseProgress_caseId_userId_Index: index("CaseProgress_CaseId_UserId_Index").on(table.userId, table.caseId),
  pk: primaryKey({ columns: [table.userId, table.caseId] }),
}));

export type CaseProgressInsert = InferInsertModel<typeof casesProgress>;
export type CaseProgress = InferSelectModel<typeof casesProgress>;

export const casesSolutions = pgTable("CaseSolution", {
  caseId: uuid("CaseId").notNull(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  solution: text("Solution").notNull(),
}, table => ({
  caseSolution_caseId_userId_Index: index("CaseSolution_CaseId_UserId_Index").on(table.userId, table.caseId),
  pk: primaryKey({ columns: [table.userId, table.caseId] }),
}));

export type CaseSolutionInsert = InferInsertModel<typeof casesSolutions>;
export type CaseSolution = InferSelectModel<typeof casesSolutions>;

export const gamesProgress = pgTable("GameProgress", {
  gameId: uuid("GameId").notNull(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  progressState: gameProgressStateEnum("ProgressState").notNull().default("not-started"),
}, table => ({
  gameId_userId_Index: index("GameId_UserId_Index").on(table.userId, table.gameId),
  pk: primaryKey({ columns: [table.userId, table.gameId] }),
}));

export type GameProgressInsert = InferInsertModel<typeof gamesProgress>;
export type GameProgress = InferSelectModel<typeof gamesProgress>;

export const searchIndexUpdateQueue = pgTable("SearchIndexUpdateQueue", {
  cmsId: uuid("CmsId").unique().notNull().primaryKey(),
  resourceType: searchIndexTypeEnum("ResourceType").notNull(),
});

export type SearchIndexUpdateQueueInsert = InferInsertModel<typeof searchIndexUpdateQueue>;
export type SearchIndexUpdateQueueItem = InferSelectModel<typeof searchIndexUpdateQueue>;

export const badges = pgTable("Badge", {
  id: uuid("Id").defaultRandom().unique().notNull().primaryKey(),
  identifier: badgeIdentifierEnum("Identifier").notNull().unique(),
  name: text("Name").notNull(),
  description: text("Description").notNull(),
  imageFilename: text("ImageFilename").notNull(),
  publicationState: badgePublicationStateEnum("PublicationState").notNull().default("not-listed"),
});

export const badgesRelations = relations(badges, ({ many }) => ({
  usersToBadges: many(usersToBadges),
}));

export type BadgeInsert = InferInsertModel<typeof badges>;
export type Badge = InferSelectModel<typeof badges>;
export type BadgeWithUserData = Badge & {
  isCompleted: boolean;
  wasSeen: boolean;
};

export const usersToBadges = pgTable("User_to_Badge", {
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  badgeId: uuid("BadgeId").references(() => badges.id, { onDelete: "no action" }).notNull(),
  userBadgeState: userBadgeStateEnum("UserBadgeState").default("not-seen").notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.userId, table.badgeId] }),
}));

export const usersToGroupsRelations = relations(usersToBadges, ({ one }) => ({
  badge: one(badges, {
    fields: [usersToBadges.badgeId],
    references: [badges.id],
  }),
  user: one(users, {
    fields: [usersToBadges.userId],
    references: [users.id],
  }),
}));

export const forumQuestions = pgTable("ForumQuestion", {
  id: uuid("Id").defaultRandom().unique().notNull().primaryKey(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  updatedAt: timestamp("UpdatedAt").defaultNow().notNull(),
  title: text("Title").notNull(),
  questionHtml: text("Question").notNull(),
  questionText: text("QuestionText").notNull(),
  legalArea: text("LegalArea").notNull(),
  legalField: text("LegalField"),
  legalTopic: text("LegalTopic"),
});

export type ForumQuestionInsert = InferInsertModel<typeof forumQuestions>;
export type ForumQuestion = InferSelectModel<typeof forumQuestions>;

export const forumAnswers = pgTable("ForumAnswer", {
  id: uuid("Id").defaultRandom().unique().notNull().primaryKey(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  updatedAt: timestamp("UpdatedAt").defaultNow().notNull(),
  answerText: text("AnswerText").notNull(),
  parentQuestionId: uuid("ParentQuestionId").references(() => forumQuestions.id, { onDelete: "no action" }),
  parentAnswerId: uuid("ParentAnswerId").references((): AnyPgColumn => forumAnswers.id, { onDelete: "no action" }),
});

export type ForumAnswerInsert = InferInsertModel<typeof forumAnswers>;
export type ForumAnswer = InferSelectModel<typeof forumAnswers>;
