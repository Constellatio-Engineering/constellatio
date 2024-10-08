/* eslint-disable sort-keys-fix/sort-keys-fix,@typescript-eslint/naming-convention,@typescript-eslint/no-use-before-define,max-lines */
import { type GameResultSchemaType } from "@/schemas/gamesProgress/setGameProgressState.schema";
import { type SearchIndex, searchIndices } from "@/utils/search";
import { getCurrentDate } from "@/utils/utils";

import { type InferInsertModel, type InferSelectModel, relations } from "drizzle-orm";
import {
  type AnyPgColumn,
  boolean,
  date,
  index,
  integer, jsonb,
  type PgColumn,
  pgEnum,
  pgTable,
  type PgTable,
  primaryKey,
  serial,
  smallint,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid
} from "drizzle-orm/pg-core";

// type InferPgSelectModel1<T extends PgTable> = {
//   [K in keyof T as T[K] extends PgColumn ? T[K]["_"]["name"] : never]: T[K] extends PgColumn
//     ? T[K]["_"]["data"] | (T[K]["_"]["notNull"] extends true ? never : null)
//     : never;
// };

type InferPgSelectModel<T extends PgTable> = {
  columns: {
    [K in keyof T as T[K] extends PgColumn ? T[K]["_"]["name"] : never]: T[K] extends PgColumn
      ? T[K]["_"]["data"] | (T[K]["_"]["notNull"] extends true ? never : null)
      : never;
  };
  table: T["_"]["name"];
};

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

export const notificationTypesIdentifiers = [
  "forumQuestionPosted",
  "answerToForumQuestionPosted",
  "forumQuestionUpvoted",
  "replyToForumAnswerPosted",
  "forumAnswerUpvoted",
  "forumAnswerAccepted",
] as const;

export const genderEnum = pgEnum("Gender", allGenderIdentifiers);
export const onboardingResultEnum = pgEnum("OnboardingResult", allOnboardingResults);
export const resourceTypeEnum = pgEnum("ResourceType", allBookmarkResourceTypes);
export const searchIndexTypeEnum = pgEnum("SearchIndexType", allSearchIndexTypes);
export const caisyWebhookEventTypeEnum = pgEnum("CaisyWebhookEventType", allCaisyWebhookEventTypes);
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
export const roleEnum = pgEnum("Role", roles);
export const notificationTypeIdentifierEnum = pgEnum("NotificationType", notificationTypesIdentifiers);
export const streakActivityTypeEnum = pgEnum("StreakActivityType", streakActivityTypes);

// TODO: Go through all queries and come up with useful indexes

export const users = pgTable("User", {
  id: uuid("Id").primaryKey(),
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
  subscriptionId: text("SubscriptionId"),
});

export const usersRelations = relations(users, ({ many }) => ({
  notifications: many(notifications),
  profilePictures: many(profilePictures),
  usersToBadges: many(usersToBadges),
  usersToRoles: many(usersToRoles),
  forumQuestions: many(forumQuestions),
  forumAnswers: many(forumAnswers),
}));

export type UserInsert = InferInsertModel<typeof users>;
export type User = InferSelectModel<typeof users>;
export type UserSql = InferPgSelectModel<typeof users>;

export const profilePictures = pgTable("ProfilePicture", {
  id: uuid("Id").primaryKey(),
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
export type ProfilePictureSql = InferPgSelectModel<typeof profilePictures>;

export const bookmarks = pgTable("Bookmark", {
  id: uuid("Id").defaultRandom().primaryKey(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  resourceType: resourceTypeEnum("ResourceType").notNull(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  resourceId: uuid("ResourceId").notNull()
}, table => ({
  userId_resourceType_resourceId_unique: unique().on(table.userId, table.resourceType, table.resourceId),
}));

export type BookmarkInsert = InferInsertModel<typeof bookmarks>;
export type Bookmark = InferSelectModel<typeof bookmarks>;
export type BookmarkSql = InferPgSelectModel<typeof bookmarks>;

export const uploadFolders = pgTable("UploadFolder", {
  id: uuid("Id").defaultRandom().primaryKey(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  name: text("Name").notNull()
});

export type UploadFolderInsert = InferInsertModel<typeof uploadFolders>;
export type UploadFolder = InferSelectModel<typeof uploadFolders>;
export type UploadFolderSql = InferPgSelectModel<typeof uploadFolders>;

export const uploadedFiles = pgTable("UploadedFile", {
  id: uuid("Id").defaultRandom().primaryKey(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  folderId: uuid("FolderId").references(() => uploadFolders.id, { onDelete: "no action" }),
  serverFilename: text("ServerFilename").notNull(),
  originalFilename: text("OriginalFilename").notNull(),
  sizeInBytes: integer("SizeInBytes").notNull(),
  fileExtension: fileExtensionEnum("FileExtension").notNull(),
  contentType: fileMimeTypeEnum("ContentType").notNull(),
});

export const uploadedFilesRelations = relations(uploadedFiles, ({ many }) => ({
  tags: many(uploadedFilesToTags),
}));

export type UploadedFileInsert = InferInsertModel<typeof uploadedFiles>;
export type UploadedFile = InferSelectModel<typeof uploadedFiles>;
export type UploadedFileSql = InferPgSelectModel<typeof uploadedFiles>;
export type UploadedFileWithTags = UploadedFile & { tags: Array<{ tagId: string }> };

export const documents = pgTable("Document", {
  id: uuid("Id").defaultRandom().primaryKey(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  updatedAt: timestamp("UpdatedAt").defaultNow().notNull().$onUpdate(getCurrentDate),
  folderId: uuid("FolderId").references(() => uploadFolders.id, { onDelete: "no action" }),
  name: text("Name").notNull(),
  content: text("Content").notNull(),
});

export const documentsRelations = relations(documents, ({ many }) => ({
  tags: many(documentsToTags),
}));

export type DocumentInsert = InferInsertModel<typeof documents>;
export type Document = InferSelectModel<typeof documents>;
export type DocumentSql = InferPgSelectModel<typeof documents>;
export type DocumentWithTags = Document & { tags: Array<{tagId: string}> };

export const notes = pgTable("Note", {
  id: uuid("Id").defaultRandom().primaryKey(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  fileId: uuid("FileId").references(() => uploadedFiles.id, { onDelete: "no action" }).notNull(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  updatedAt: timestamp("UpdatedAt").defaultNow().notNull().$onUpdate(getCurrentDate),
  content: text("Content").notNull(),
});

export type NoteInsert = InferInsertModel<typeof notes>;
export type Note = InferSelectModel<typeof notes>;
export type NoteSql = InferPgSelectModel<typeof notes>;

export const casesViews = pgTable("CaseView", {
  id: serial().primaryKey(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  caseId: uuid("CaseId").notNull(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
}, table => ({
  caseId_index: index("CaseView_CaseId_Index").on(table.caseId),
}));

export type CaseViewInsert = InferInsertModel<typeof casesViews>;
export type CaseView = InferSelectModel<typeof casesViews>;
export type CaseViewSql = InferPgSelectModel<typeof casesViews>;

export const articlesViews = pgTable("ArticleView", {
  id: serial().primaryKey(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  articleId: uuid("ArticleId").notNull(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
}, table => ({
  articleId_index: index("ArticleView_ArticleId_Index").on(table.articleId),
}));

export type ArticleViewInsert = InferInsertModel<typeof articlesViews>;
export type ArticleView = InferSelectModel<typeof articlesViews>;
export type ArticleViewSql = InferPgSelectModel<typeof articlesViews>;

export const casesProgress = pgTable("CaseProgress", {
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  caseId: uuid("CaseId").notNull(),
  progressState: caseProgressStateEnum("ProgressState").notNull().default("not-started"),
}, table => ({
  pk: primaryKey({ columns: [table.userId, table.caseId] }),
}));

export type CaseProgressInsert = InferInsertModel<typeof casesProgress>;
export type CaseProgress = InferSelectModel<typeof casesProgress>;
export type CaseProgressSql = InferPgSelectModel<typeof casesProgress>;

export const casesSolutions = pgTable("CaseSolution", {
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  caseId: uuid("CaseId").notNull(),
  solution: text("Solution").notNull(),
}, table => ({
  pk: primaryKey({ columns: [table.userId, table.caseId] }),
}));

export type CaseSolutionInsert = InferInsertModel<typeof casesSolutions>;
export type CaseSolution = InferSelectModel<typeof casesSolutions>;
export type CaseSolutionSql = InferPgSelectModel<typeof casesSolutions>;

export const gamesProgress = pgTable("GameProgress", {
  id: serial("Id").primaryKey(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  gameId: uuid("GameId").notNull(),
  progressState: gameProgressStateEnum("ProgressState").notNull().default("not-started"),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  updatedAt: timestamp("UpdatedAt").defaultNow().notNull().$onUpdate(getCurrentDate),
  gameResult: jsonb("GameResult").$type<GameResultSchemaType>(),
}, table => ({
  unique: unique().on(table.userId, table.gameId),
}));

export type GameProgressInsert = InferInsertModel<typeof gamesProgress>;
export type GameProgress = InferSelectModel<typeof gamesProgress>;
export type GameProgressSql = InferPgSelectModel<typeof gamesProgress>;

export const searchIndexUpdateQueue = pgTable("SearchIndexUpdateQueue", {
  cmsId: uuid("CmsId").notNull(),
  searchIndexType: searchIndexTypeEnum("SearchIndexType").notNull(),
  eventType: caisyWebhookEventTypeEnum("EventType").notNull(),
}, table => ({
  pk: primaryKey({ columns: [table.cmsId, table.searchIndexType, table.eventType] }),
}));

export type SearchIndexUpdateQueueInsert = InferInsertModel<typeof searchIndexUpdateQueue>;
export type SearchIndexUpdateQueueItem = InferSelectModel<typeof searchIndexUpdateQueue>;
export type SearchIndexUpdateQueueItemSql = InferPgSelectModel<typeof searchIndexUpdateQueue>;

export const badges = pgTable("Badge", {
  id: uuid("Id").defaultRandom().primaryKey(),
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
export type BadgeSql = InferPgSelectModel<typeof badges>;
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

export const usersToBadgesRelations = relations(usersToBadges, ({ one }) => ({
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
  id: uuid("Id").defaultRandom().primaryKey(),
  index: serial("Index"),
  slug: text("Slug").notNull(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  updatedAt: timestamp("UpdatedAt").defaultNow().notNull().$onUpdate(getCurrentDate),
  title: text("Title").notNull(),
  text: text("Text").notNull(),
}, table => ({
  id_slug_index: uniqueIndex("ForumQuestion_Id_Slug_Index").on(table.id, table.slug),
}));

export const forumQuestionsRelations = relations(forumQuestions, ({ many, one }) => ({
  forumQuestionToLegalFields: many(forumQuestionsToLegalFields),
  forumQuestionToSubfields: many(forumQuestionToSubfields),
  forumQuestionToTopics: many(forumQuestionToTopics),
  answers: many(forumAnswers),
  upvotes: many(questionUpvotes),
  user: one(users, {
    fields: [forumQuestions.userId],
    references: [users.id],
    relationName: "author",
  }),
}));

export type ForumQuestionInsert = InferInsertModel<typeof forumQuestions>;
export type ForumQuestion = InferSelectModel<typeof forumQuestions>;
export type ForumQuestionSql = InferPgSelectModel<typeof forumQuestions>;

export const forumQuestionsToLegalFields = pgTable("ForumQuestion_to_LegalField", {
  questionId: uuid("QuestionId").references(() => forumQuestions.id, { onDelete: "cascade" }).notNull(),
  legalFieldId: uuid("LegalFieldId").notNull(),
}, table => ({
  pk: primaryKey({ columns: [table.questionId, table.legalFieldId] }),
}));

export const forumQuestionsToLegalFieldsRelations = relations(forumQuestionsToLegalFields, ({ one }) => ({
  question: one(forumQuestions, {
    fields: [forumQuestionsToLegalFields.questionId],
    references: [forumQuestions.id],
  }),
}));

export type ForumQuestionToLegalFieldInsert = InferInsertModel<typeof forumQuestionsToLegalFields>;
export type ForumQuestionToLegalField = InferSelectModel<typeof forumQuestionsToLegalFields>;
export type ForumQuestionToLegalFieldSql = InferPgSelectModel<typeof forumQuestionsToLegalFields>;

export const forumQuestionToSubfields = pgTable("ForumQuestion_to_Subfield", {
  questionId: uuid("QuestionId").references(() => forumQuestions.id, { onDelete: "cascade" }).notNull(),
  subfieldId: uuid("SubfieldId").notNull(),
}, table => ({
  pk: primaryKey({ columns: [table.questionId, table.subfieldId] }),
}));

export const forumQuestionToSubfieldsRelations = relations(forumQuestionToSubfields, ({ one }) => ({
  question: one(forumQuestions, {
    fields: [forumQuestionToSubfields.questionId],
    references: [forumQuestions.id],
  }),
}));

export type ForumQuestionToSubfieldInsert = InferInsertModel<typeof forumQuestionToSubfields>;
export type ForumQuestionToSubfield = InferSelectModel<typeof forumQuestionToSubfields>;
export type ForumQuestionToSubfieldSql = InferPgSelectModel<typeof forumQuestionToSubfields>;

export const forumQuestionToTopics = pgTable("ForumQuestion_to_Topic", {
  questionId: uuid("QuestionId").references(() => forumQuestions.id, { onDelete: "cascade" }).notNull(),
  topicId: uuid("TopicId").notNull(),
}, table => ({
  pk: primaryKey({ columns: [table.questionId, table.topicId] }),
}));

export const forumQuestionToTopicsRelations = relations(forumQuestionToTopics, ({ one }) => ({
  question: one(forumQuestions, {
    fields: [forumQuestionToTopics.questionId],
    references: [forumQuestions.id],
  }),
}));

export type ForumQuestionToTopicInsert = InferInsertModel<typeof forumQuestionToTopics>;
export type ForumQuestionToTopic = InferSelectModel<typeof forumQuestionToTopics>;
export type ForumQuestionToTopicSql = InferPgSelectModel<typeof forumQuestionToTopics>;

export const forumQuestionViews = pgTable("ForumQuestionView", {
  id: serial().primaryKey(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  questionIdId: uuid("QuestionId").notNull(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
}, table => ({
  questionId_index: index("ForumQuestionView_QuestionId_Index").on(table.questionIdId),
}));

export type ForumQuestionViewInsert = InferInsertModel<typeof forumQuestionViews>;
export type ForumQuestionView = InferSelectModel<typeof forumQuestionViews>;
export type ForumQuestionViewSql = InferPgSelectModel<typeof forumQuestionViews>;

export const forumAnswers = pgTable("ForumAnswer", {
  id: uuid("Id").defaultRandom().primaryKey(),
  index: serial("Index"),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  updatedAt: timestamp("UpdatedAt").defaultNow().notNull().$onUpdate(getCurrentDate),
  text: text("AnswerText").notNull(),
  parentQuestionId: uuid("ParentQuestionId").references(() => forumQuestions.id, { onDelete: "no action" }),
  parentAnswerId: uuid("ParentAnswerId").references((): AnyPgColumn => forumAnswers.id, { onDelete: "no action" }),
});

export const forumAnswersRelations = relations(forumAnswers, ({ one }) => ({
  user: one(users, {
    fields: [forumAnswers.userId],
    references: [users.id],
    relationName: "author",
  }),
  question: one(forumQuestions, {
    fields: [forumAnswers.parentQuestionId],
    references: [forumQuestions.id],
  }),
}));

export type ForumAnswerInsert = InferInsertModel<typeof forumAnswers>;
export type ForumAnswer = InferSelectModel<typeof forumAnswers>;
export type ForumAnswerSql = InferPgSelectModel<typeof forumAnswers>;

export const correctAnswers = pgTable("CorrectAnswer", {
  id: uuid("Id").defaultRandom().primaryKey(),
  confirmedAt: timestamp("ConfirmedAt").defaultNow().notNull(),
  confirmedByUserId: uuid("ConfirmedByUserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  questionId: uuid("QuestionId").references(() => forumQuestions.id, { onDelete: "cascade" }).notNull(),
  answerId: uuid("AnswerId").references(() => forumAnswers.id, { onDelete: "cascade" }).unique().notNull(),
});

export type CorrectAnswerInsert = InferInsertModel<typeof correctAnswers>;
export type CorrectAnswer = InferSelectModel<typeof correctAnswers>;
export type CorrectAnswerSql = InferPgSelectModel<typeof correctAnswers>;

export const questionUpvotes = pgTable("QuestionUpvote", {
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  questionId: uuid("QuestionId").references(() => forumQuestions.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("CreatedAt").defaultNow(),
}, table => ({
  questionId_index: index("QuestionUpvote_QuestionId_Index").on(table.questionId),
  pk: primaryKey({ columns: [table.userId, table.questionId] }),
}));

export const questionUpvotesRelations = relations(questionUpvotes, ({ one }) => ({
  question: one(forumQuestions, {
    fields: [questionUpvotes.questionId],
    references: [forumQuestions.id],
  }),
}));

export type QuestionUpvoteInsert = InferInsertModel<typeof questionUpvotes>;
export type QuestionUpvote = InferSelectModel<typeof questionUpvotes>;
export type QuestionUpvoteSql = InferPgSelectModel<typeof questionUpvotes>;

export const answerUpvotes = pgTable("AnswerUpvote", {
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  answerId: uuid("AnswerId").references(() => forumAnswers.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("CreatedAt").defaultNow(),
}, table => ({
  answerId_index: index("AnswerUpvote_QuestionId_Index").on(table.answerId),
  pk: primaryKey({ columns: [table.userId, table.answerId] }),
}));

export type AnswerUpvoteInsert = InferInsertModel<typeof answerUpvotes>;
export type AnswerUpvote = InferSelectModel<typeof answerUpvotes>;
export type AnswerUpvoteSql = InferPgSelectModel<typeof answerUpvotes>;

export const userRoles = pgTable("UserRole", {
  id: uuid("Id").defaultRandom().primaryKey(),
  identifier: roleEnum("Identifier").unique().notNull(),
  name: text("Name").notNull(),
  description: text("Description").notNull(),
}, table => ({
  role_index: index("UserRole_Role_Index").on(table.identifier),
}));

export const userRolesRelations = relations(userRoles, ({ many }) => ({
  usersToRoles: many(usersToRoles),
}));

export type UserRoleInsert = InferInsertModel<typeof userRoles>;
export type UserRole = InferSelectModel<typeof userRoles>;
export type UserRoleSql = InferPgSelectModel<typeof userRoles>;

export const usersToRoles = pgTable("User_to_Role", {
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  roleId: uuid("RoleId").references(() => userRoles.id, { onDelete: "no action" }).notNull(),
}, table => ({
  pk: primaryKey({ columns: [table.userId, table.roleId] }),
}));

export const usersToRolesRelations = relations(usersToRoles, ({ one }) => ({
  role: one(userRoles, {
    fields: [usersToRoles.roleId],
    references: [userRoles.id],
  }),
  user: one(users, {
    fields: [usersToRoles.userId],
    references: [users.id],
  }),
}));

export type UserToRoleInsert = InferInsertModel<typeof usersToRoles>;
export type UserToRole = InferSelectModel<typeof usersToRoles>;
export type UserToRoleSql = InferPgSelectModel<typeof usersToRoles>;

export const notificationTypes = pgTable("NotificationType", {
  identifier: notificationTypeIdentifierEnum("NotificationType").primaryKey(),
  name: text("Name").notNull(),
  description: text("Description").notNull(),
});

export const notificationTypesRelations = relations(notificationTypes, ({ many }) => ({
  notifications: many(notifications),
}));

export type NotificationTypeInsert = InferInsertModel<typeof notificationTypes>;
export type NotificationType = InferSelectModel<typeof notificationTypes>;
export type NotificationTypeSql = InferPgSelectModel<typeof notificationTypes>;

export const notifications = pgTable("Notification", {
  id: uuid("Id").defaultRandom().primaryKey(),
  index: serial("Index"),
  recipientId: uuid("RecipientId").references(() => users.id, { onDelete: "no action" }).notNull(),
  senderId: uuid("SenderId").references(() => users.id, { onDelete: "no action" }).notNull(),
  resourceId: uuid("ResourceId"),
  typeIdentifier: notificationTypeIdentifierEnum("Type").references(() => notificationTypes.identifier, { onDelete: "no action" }).notNull(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  readAt: timestamp("ReadAt"),
});

export const notificationsRelations = relations(notifications, ({ one }) => ({
  notificationType: one(notificationTypes, {
    fields: [notifications.typeIdentifier],
    references: [notificationTypes.identifier],
  }),
  recipient: one(users, {
    fields: [notifications.recipientId],
    references: [users.id],
  }),
  sender: one(users, {
    fields: [notifications.senderId],
    references: [users.id],
  }),
}));

export type NotificationInsert = InferInsertModel<typeof notifications>;
export type Notification = InferSelectModel<typeof notifications>;
export type NotificationSql = InferPgSelectModel<typeof notifications>;

export const pings = pgTable("Ping", {
  index: serial("Index").primaryKey(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "cascade" }).notNull(),
  path: text("Path").notNull(),
  search: text("Search"),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  pingInterval: smallint("PingInterval").notNull(),
}, table => ({
  path_index: index("Ping_Path_Index").on(table.path),
}));

export type PingInsert = InferInsertModel<typeof pings>;
export type Ping = InferSelectModel<typeof pings>;
export type PingSql = InferPgSelectModel<typeof pings>;

export const documentsToTags = pgTable("Document_to_Tag", {
  documentId: uuid("DocumentId").references(() => documents.id, { onDelete: "cascade" }).notNull(),
  tagId: uuid("TagId").notNull(),
}, table => ({
  pk: primaryKey({ columns: [table.documentId, table.tagId] }),
}));

export const documentsToTagsRelations = relations(documentsToTags, ({ one }) => ({
  document: one(documents, {
    fields: [documentsToTags.documentId],
    references: [documents.id],
  }),
}));

export type DocumentToTagInsert = InferInsertModel<typeof documentsToTags>;
export type DocumentToTag = InferSelectModel<typeof documentsToTags>;
export type DocumentToTagSql = InferPgSelectModel<typeof documentsToTags>;

export const uploadedFilesToTags = pgTable("UploadedFile_to_Tag", {
  fileId: uuid("FileId").references(() => uploadedFiles.id, { onDelete: "cascade" }).notNull(),
  tagId: uuid("TagId").notNull(),
}, table => ({
  pk: primaryKey({ columns: [table.fileId, table.tagId] }),
}));

export const uploadedFilesToTagsRelations = relations(uploadedFilesToTags, ({ one }) => ({
  file: one(uploadedFiles, {
    fields: [uploadedFilesToTags.fileId],
    references: [uploadedFiles.id],
  }),
}));

export type UploadedFileToTagInsert = InferInsertModel<typeof uploadedFilesToTags>;
export type UploadedFileToTag = InferSelectModel<typeof uploadedFilesToTags>;
export type UploadedFileToTagSql = InferPgSelectModel<typeof uploadedFilesToTags>;

export const referralCodes = pgTable("ReferralCode", {
  code: text("Code").primaryKey(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "cascade" })
});

export type ReferralCodeInsert = InferInsertModel<typeof referralCodes>;
export type ReferralCode = InferSelectModel<typeof referralCodes>;
export type ReferralCodeSql = InferPgSelectModel<typeof referralCodes>;

export const referrals = pgTable("Referral", {
  index: serial("Index").primaryKey(),
  code: text("Code").notNull(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  referredUserId: uuid("ReferredUserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  referringUserId: uuid("ReferringUserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  paid: boolean("Paid").default(false).notNull(),
});

export type ReferralInsert = InferInsertModel<typeof referrals>;
export type Referral = InferSelectModel<typeof referrals>;
export type ReferralSql = InferPgSelectModel<typeof referrals>;

export const referralBalances = pgTable("ReferralBalance", {
  index: serial("Index").primaryKey(),
  totalRefferalBonus: integer("TotalRefferalBonus").default(0).notNull(),
  paidOutRefferalBonus: integer("PaidOutRefferalBonus").default(0).notNull(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "cascade" }).notNull(),
});

export type ReferralBalanceInsert = InferInsertModel<typeof referralBalances>;
export type ReferralBalance = InferSelectModel<typeof referralBalances>;
export type ReferralBalanceSql = InferPgSelectModel<typeof referralBalances>;

export const updateUserInCrmQueue = pgTable("UpdateUserInCrmQueue", {
  userId: uuid("UserId").references(() => users.id, { onDelete: "cascade" }).notNull().unique(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
});

export type UpdateUserInCrmQueueInsert = InferInsertModel<typeof updateUserInCrmQueue>;
export type UpdateUserInCrmQueue = InferSelectModel<typeof updateUserInCrmQueue>;

export const streak = pgTable("Streak", {
  id: serial("id").primaryKey(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  startDate: date("StartDate", { mode: "date" }).defaultNow().notNull(),
  lastSatisfiedDate: date("LastSatisfiedDate", { mode: "date" }).defaultNow().notNull(),
  satisfiedDays: integer("SatisfiedDays").default(1),
  streakAlive: boolean("StreakAlive").default(true),
  lastCheckDate: date("LastCheckDate", { mode: "date" }).defaultNow().notNull(),
});

export type StreakInsert = InferInsertModel<typeof streak>;
export type Streak = InferSelectModel<typeof streak>;
export type StreakSql = InferPgSelectModel<typeof streak>;

export const streakActivities = pgTable("StreakActivities", {
  id: serial("id").primaryKey(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "cascade" }).notNull(),
  activityType: streakActivityTypeEnum("ActivityType").notNull(),
  createdAt: date("CreatedAt", { mode: "date" }).defaultNow().notNull(),
});

export type StreakActivityInsert = InferInsertModel<typeof streakActivities>;
export type StreakActivity = InferSelectModel<typeof streakActivities>;
export type StreakActivitySql = InferPgSelectModel<typeof streakActivities>;
