/* eslint-disable sort-keys-fix/sort-keys-fix,@typescript-eslint/naming-convention,@typescript-eslint/no-use-before-define,max-lines,import/no-deprecated */

import { type GameResultSchemaType } from "@constellatio/schemas/routers/gamesProgress/setGameProgressState.schema";
import {
  allBookmarkResourceTypes,
  allCaisyWebhookEventTypes,
  allCaseProgressStates,
  allGameProgressStates,
  allGenderIdentifiers,
  allOnboardingResults,
  allSearchIndexTypes,
  allSubscriptionStatuses, authProviders,
  badgeIdentifiers, badgePublicationState, contentItemViewsTypes,
  documentFileExtensions,
  documentFileMimeTypes,
  fileExtensions,
  fileMimeTypes,
  imageFileExtensions,
  imageFileMimeTypes, notificationTypesIdentifiers, profilePictureSources, roles, streakActivityTypes, userBadgeStates
} from "@constellatio/shared/validation";
import { getCurrentDate } from "@constellatio/utils/dates";
import { type InferInsertModel, type InferSelectModel, relations, sql } from "drizzle-orm";
import {
  type AnyPgColumn,
  boolean,
  date,
  index,
  integer, jsonb,
  type PgColumn,
  pgEnum,
  pgTable,
  pgPolicy,
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
import { authenticatedRole, authUid } from "drizzle-orm/supabase";

type InferPgSelectModel<T extends PgTable> = {
  columns: {
    [K in keyof T as T[K] extends PgColumn ? T[K]["_"]["name"] : never]: T[K] extends PgColumn
      ? T[K]["_"]["data"] | (T[K]["_"]["notNull"] extends true ? never : null)
      : never;
  };
  table: T["_"]["name"];
};

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
export const contentItemViewTypeEnum = pgEnum("ContentItemViewType", contentItemViewsTypes);
export const authProviderEnum = pgEnum("AuthProvider", authProviders);
export const profilePictureSourceEnum = pgEnum("ProfilePictureSource", profilePictureSources);

// TODO: Go through all queries and come up with useful indexes

export const users = pgTable("User", {
  id: uuid("Id").primaryKey(),
  authProvider: authProviderEnum("AuthProvider").notNull(),
  email: text("Email").unique().notNull(),
  displayName: text("DisplayName").notNull(),
  firstName: text("FirstName"),
  gender: genderEnum("Gender"),
  lastName: text("LastName"),
  semester: smallint("Semester"),
  stripeCustomerId: text("StripeCustomerId"),
  university: text("University"),
  onboardingResult: onboardingResultEnum("OnboardingResult"),
  subscriptionStatus: subscriptionStatusEnum("SubscriptionStatus"),
  subscriptionId: text("SubscriptionId"),
}).enableRLS();

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

/*
 * This table is used to store profile pictures for users.
 * There are two types of profile pictures:
 * 1. Internal profile pictures. These are profile pictures that were uploaded by the user to our own cloud storage.
 * 2. External profile pictures. These are the original profile pictures from the social auth provider.
 * Be careful because some columns like serverFilename cannot be null when the profile picture source is internal.
 */
export const profilePictures = pgTable("ProfilePicture", {
  id: uuid("Id").primaryKey(),
  serverFilename: text("ServerFilename"),
  url: text("Url"),
  fileExtension: imageFileExtensionEnum("FileExtension"),
  contentType: imageFileMimeTypeEnum("ContentType"),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull().unique(),
  profilePictureSource: profilePictureSourceEnum("ProfilePictureSource").notNull(),
}).enableRLS();

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
})).enableRLS();

export type BookmarkInsert = InferInsertModel<typeof bookmarks>;
export type Bookmark = InferSelectModel<typeof bookmarks>;
export type BookmarkSql = InferPgSelectModel<typeof bookmarks>;

export const uploadFolders = pgTable("UploadFolder", {
  id: uuid("Id").defaultRandom().primaryKey(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  name: text("Name").notNull()
}).enableRLS();

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
}).enableRLS();

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
}).enableRLS();

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
}).enableRLS();

export type NoteInsert = InferInsertModel<typeof notes>;
export type Note = InferSelectModel<typeof notes>;
export type NoteSql = InferPgSelectModel<typeof notes>;

export const casesProgress = pgTable("CaseProgress", {
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  caseId: uuid("CaseId").notNull(),
  progressState: caseProgressStateEnum("ProgressState").notNull().default("not-started"),
}, table => ({
  pk: primaryKey({ columns: [table.userId, table.caseId] }),
})).enableRLS();

export type CaseProgressInsert = InferInsertModel<typeof casesProgress>;
export type CaseProgress = InferSelectModel<typeof casesProgress>;
export type CaseProgressSql = InferPgSelectModel<typeof casesProgress>;

export const casesSolutions = pgTable("CaseSolution", {
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  caseId: uuid("CaseId").notNull(),
  solution: text("Solution").notNull(),
}, table => ({
  pk: primaryKey({ columns: [table.userId, table.caseId] }),
})).enableRLS();

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
  wasSolvedCorrectly: boolean("WasSolvedCorrectly"),
}, table => ({
  unique: unique().on(table.userId, table.gameId),
})).enableRLS();

export type GameProgressInsert = InferInsertModel<typeof gamesProgress>;
export type GameProgress = InferSelectModel<typeof gamesProgress>;
export type GameProgressSql = InferPgSelectModel<typeof gamesProgress>;

export const searchIndexUpdateQueue = pgTable("SearchIndexUpdateQueue", {
  cmsId: uuid("CmsId").notNull(),
  searchIndexType: searchIndexTypeEnum("SearchIndexType").notNull(),
  eventType: caisyWebhookEventTypeEnum("EventType").notNull(),
}, table => ({
  pk: primaryKey({ columns: [table.cmsId, table.searchIndexType, table.eventType] }),
})).enableRLS();

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
}).enableRLS();

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
}, (table) => [
  primaryKey({ columns: [table.userId, table.badgeId] }),
  pgPolicy("usersToBadges_read_access_for_users_own_badges", {
    as: "permissive",
    for: "select",
    to: authenticatedRole,
    using: sql`${table.userId} = auth.uid()`
  })
]).enableRLS();

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
})).enableRLS();

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
})).enableRLS();

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
})).enableRLS();

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
})).enableRLS();

export const forumQuestionToTopicsRelations = relations(forumQuestionToTopics, ({ one }) => ({
  question: one(forumQuestions, {
    fields: [forumQuestionToTopics.questionId],
    references: [forumQuestions.id],
  }),
}));

export type ForumQuestionToTopicInsert = InferInsertModel<typeof forumQuestionToTopics>;
export type ForumQuestionToTopic = InferSelectModel<typeof forumQuestionToTopics>;
export type ForumQuestionToTopicSql = InferPgSelectModel<typeof forumQuestionToTopics>;

export const forumAnswers = pgTable("ForumAnswer", {
  id: uuid("Id").defaultRandom().primaryKey(),
  index: serial("Index"),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  updatedAt: timestamp("UpdatedAt").defaultNow().notNull().$onUpdate(getCurrentDate),
  text: text("AnswerText").notNull(),
  parentQuestionId: uuid("ParentQuestionId").references(() => forumQuestions.id, { onDelete: "no action" }),
  parentAnswerId: uuid("ParentAnswerId").references((): AnyPgColumn => forumAnswers.id, { onDelete: "no action" }),
}).enableRLS();

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
}).enableRLS();

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
})).enableRLS();

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
})).enableRLS();

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
})).enableRLS();

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
})).enableRLS();

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
}).enableRLS();

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
}, (table) => [
  pgPolicy("notifications_read_access_for_users_own_notifications", {
    as: "permissive",
    for: "select",
    to: authenticatedRole,
    using: sql`${table.recipientId} = auth.uid()`
  })
]).enableRLS();

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
})).enableRLS();

export type PingInsert = InferInsertModel<typeof pings>;
export type Ping = InferSelectModel<typeof pings>;
export type PingSql = InferPgSelectModel<typeof pings>;

export const documentsToTags = pgTable("Document_to_Tag", {
  documentId: uuid("DocumentId").references(() => documents.id, { onDelete: "cascade" }).notNull(),
  tagId: uuid("TagId").notNull(),
}, table => ({
  pk: primaryKey({ columns: [table.documentId, table.tagId] }),
})).enableRLS();

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
})).enableRLS();

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
  userId: uuid("UserId").references(() => users.id, { onDelete: "cascade" }).notNull()
}).enableRLS();

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
}).enableRLS();

export type ReferralInsert = InferInsertModel<typeof referrals>;
export type Referral = InferSelectModel<typeof referrals>;
export type ReferralSql = InferPgSelectModel<typeof referrals>;

export const referralBalances = pgTable("ReferralBalance", {
  index: serial("Index").primaryKey(),
  totalRefferalBonus: integer("TotalRefferalBonus").default(0).notNull(),
  paidOutRefferalBonus: integer("PaidOutRefferalBonus").default(0).notNull(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "cascade" }).notNull(),
}).enableRLS();

export type ReferralBalanceInsert = InferInsertModel<typeof referralBalances>;
export type ReferralBalance = InferSelectModel<typeof referralBalances>;
export type ReferralBalanceSql = InferPgSelectModel<typeof referralBalances>;

export const updateUserInCrmQueue = pgTable("UpdateUserInCrmQueue", {
  userId: uuid("UserId").references(() => users.id, { onDelete: "cascade" }).notNull().unique(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
}).enableRLS();

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
}).enableRLS();

export type StreakInsert = InferInsertModel<typeof streak>;
export type Streak = InferSelectModel<typeof streak>;
export type StreakSql = InferPgSelectModel<typeof streak>;

export const streakActivities = pgTable("StreakActivities", {
  id: serial("id").primaryKey(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "cascade" }).notNull(),
  activityType: streakActivityTypeEnum("ActivityType").notNull(),
  createdAt: date("CreatedAt", { mode: "date" }).defaultNow().notNull(),
}).enableRLS();

export type StreakActivityInsert = InferInsertModel<typeof streakActivities>;
export type StreakActivity = InferSelectModel<typeof streakActivities>;
export type StreakActivitySql = InferPgSelectModel<typeof streakActivities>;

export const contentViews = pgTable("ContentView", {
  id: serial().primaryKey(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  contentItemId: uuid("ContentItemId").notNull(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  contentItemType: contentItemViewTypeEnum("ContentItemType").notNull(),
}, table => ({
  contentItemId_index: index("ContentView_ContentItemId_Index").on(table.contentItemId),
  contentItemType_index: index("ContentView_ContentItemType_Index").on(table.contentItemType),
})).enableRLS();

export type ContentViewInsert = InferInsertModel<typeof contentViews>;
export type ContentView = InferSelectModel<typeof contentViews>;
export type ContentViewSql = InferPgSelectModel<typeof contentViews>;
