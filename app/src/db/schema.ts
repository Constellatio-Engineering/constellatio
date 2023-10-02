/* eslint-disable sort-keys-fix/sort-keys-fix */
import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import {
  text, pgTable, integer, pgEnum, uuid, smallint, unique, timestamp
} from "drizzle-orm/pg-core";

export const allGenderIdentifiers = ["male", "female", "diverse",] as const;
export type GenderIdentifier = typeof allGenderIdentifiers[number];

export const allBookmarkResourceTypes = ["article", "case"] as const;
export type BookmarkResourceType = typeof allBookmarkResourceTypes[number];

export const genderEnum = pgEnum("Gender", allGenderIdentifiers);
export const resourceTypeEnum = pgEnum("ResourceType", allBookmarkResourceTypes);

export const users = pgTable("User", {
  id: uuid("Id").unique().notNull().primaryKey(),
  email: text("Email").unique().notNull(),
  displayName: text("DisplayName").notNull(),
  firstName: text("FirstName").notNull(),
  gender: genderEnum("Gender").notNull(),
  lastName: text("LastName").notNull(),
  semester: smallint("Semester"),
  stripeCustomerId: text("StripeCustomerId"),
  university: text("University").notNull()
});

export type UserInsert = InferInsertModel<typeof users>;
export type User = InferSelectModel<typeof users>;

export const bookmarks = pgTable("Bookmark", {
  id: uuid("Id").defaultRandom().unique().notNull(),
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
  id: uuid("Id").defaultRandom().unique().notNull(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  name: text("Name").notNull()
});

export type UploadFolderInsert = InferInsertModel<typeof uploadFolders>;
export type UploadFolder = InferSelectModel<typeof uploadFolders>;

export const uploadedFiles = pgTable("UploadedFile", {
  id: uuid("Id").defaultRandom().unique().notNull(),
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

export const documents = pgTable("Document", {
  id: uuid("Id").defaultRandom().unique().notNull(),
  userId: uuid("UserId").references(() => users.id, { onDelete: "no action" }).notNull(),
  createdAt: timestamp("CreatedAt").defaultNow().notNull(),
  updatedAt: timestamp("UpdatedAt").defaultNow().notNull(),
  folderId: uuid("FolderId").references(() => uploadFolders.id, { onDelete: "no action" }),
  name: text("Name").notNull(),
  content: text("Content").notNull(),
});

export type DocumentInsert = InferInsertModel<typeof documents>;
export type Document = InferSelectModel<typeof documents>;
