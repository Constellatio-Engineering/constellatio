/* eslint-disable sort-keys-fix/sort-keys-fix,@typescript-eslint/naming-convention,@typescript-eslint/no-use-before-define */
import { type InferInsertModel, type InferSelectModel, relations } from "drizzle-orm";
import {
  text, pgTable, integer, pgEnum, uuid, smallint, unique, timestamp, primaryKey, index
} from "drizzle-orm/pg-core";

export const allGenderIdentifiers = ["male", "female", "diverse",] as const;
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

export const genderEnum = pgEnum("Gender", allGenderIdentifiers);
export const onboardingResultEnum = pgEnum("OnboardingResult", allOnboardingResults);
export const resourceTypeEnum = pgEnum("ResourceType", allBookmarkResourceTypes);
export const searchIndexTypeEnum = pgEnum("SearchIndexType", allSearchIndexTypes);
export const caseProgressStateEnum = pgEnum("CaseProgressState", allCaseProgressStates);
export const gameProgressStateEnum = pgEnum("GameProgressState", allGameProgressStates);
export const subscriptionStatusEnum = pgEnum("SubscriptionStatus", allSubscriptionStatuses);

// TODO: Go through all queries and come up with useful indexes

export const users = pgTable("User", {
  id: uuid("Id").unique().notNull().primaryKey(),
  email: text("Email").unique().notNull(),
  displayName: text("DisplayName").notNull(),
  firstName: text("FirstName").notNull(),
  gender: genderEnum("Gender").notNull(),
  lastName: text("LastName").notNull(),
  semester: smallint("Semester"),
  stripeCustomerId: text("StripeCustomerId"),
  university: text("University").notNull(),
  onboardingResult: onboardingResultEnum("OnboardingResult"),
  subscriptionStatus: subscriptionStatusEnum("SubscriptionStatus"),
  subscriptionStartDate: timestamp("SubscriptionStartDate"),
  subscriptionEndDate: timestamp("SubscriptionEndDate"),
  subscribedPlanPriceId: text("SubscribedPlanPriceId"),
});

export const usersRelations = relations(users, ({ many }) => ({
  profilePictures: many(profilePictures),
}));

export type UserInsert = InferInsertModel<typeof users>;
export type User = InferSelectModel<typeof users>;

export const profilePictures = pgTable("ProfilePicture", {
  id: uuid("Id").unique().notNull().primaryKey(),
  serverFilename: text("ServerFilename").notNull(),
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
  fileExtension: text("FileExtension").notNull()
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
}, table => ({
  caseIdIndex: index("CaseId_Index").on(table.caseId),
  pk: primaryKey(table.userId, table.caseId),
}));

export type CaseViewInsert = InferInsertModel<typeof casesViews>;
export type CaseView = InferSelectModel<typeof casesViews>;

export const articlesViews = pgTable("ArticleView", {
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  articleId: uuid("ArticleId").notNull(),
}, table => ({
  articleIdIndex: index("ArticleId_Index").on(table.articleId),
  pk: primaryKey(table.userId, table.articleId),
}));

export type ArticleViewInsert = InferInsertModel<typeof articlesViews>;
export type ArticleView = InferSelectModel<typeof articlesViews>;

export const casesProgress = pgTable("CaseProgress", {
  caseId: uuid("CaseId").notNull(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  progressState: caseProgressStateEnum("ProgressState").notNull().default("not-started"),
}, table => ({
  caseId_userId_Index: index("CaseId_UserId_Index").on(table.userId, table.caseId),
  pk: primaryKey(table.userId, table.caseId),
}));

export type CaseProgressInsert = InferInsertModel<typeof casesProgress>;
export type CaseProgress = InferSelectModel<typeof casesProgress>;

export const casesSolutions = pgTable("CaseSolution", {
  caseId: uuid("CaseId").notNull(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  solution: text("Solution").notNull(),
}, table => ({
  caseId_userId_Index: index("CaseId_UserId_Index").on(table.userId, table.caseId),
  pk: primaryKey(table.userId, table.caseId),
}));

export type CaseSolutionInsert = InferInsertModel<typeof casesSolutions>;
export type CaseSolution = InferSelectModel<typeof casesSolutions>;

export const gamesProgress = pgTable("GameProgress", {
  gameId: uuid("GameId").notNull(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  progressState: gameProgressStateEnum("ProgressState").notNull().default("not-started"),
}, table => ({
  gameId_userId_Index: index("GameId_UserId_Index").on(table.userId, table.gameId),
  pk: primaryKey(table.userId, table.gameId),
}));

export type GameProgressInsert = InferInsertModel<typeof gamesProgress>;
export type GameProgress = InferSelectModel<typeof gamesProgress>;

export const searchIndexUpdateQueue = pgTable("SearchIndexUpdateQueue", {
  cmsId: uuid("CmsId").unique().notNull().primaryKey(),
  resourceType: searchIndexTypeEnum("ResourceType").notNull(),
});

export type SearchIndexUpdateQueueInsert = InferInsertModel<typeof searchIndexUpdateQueue>;
export type SearchIndexUpdateQueueItem = InferSelectModel<typeof searchIndexUpdateQueue>;
