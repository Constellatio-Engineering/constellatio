/* eslint-disable sort-keys-fix/sort-keys-fix */
import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import {
  text, pgTable, integer, pgEnum, uuid, smallint, unique, timestamp
} from "drizzle-orm/pg-core";

export const allGenderIdentifiers = ["male", "female", "diverse",] as const;
export type GenderIdentifier = typeof allGenderIdentifiers[number];

export const allBookmarkResourceTypes = ["article", "case"] as const;
export type BookmarkResourceType = typeof allBookmarkResourceTypes[number];

export const genderEnum = pgEnum("gender", allGenderIdentifiers);
export const resourceTypeEnum = pgEnum("resourceType", allBookmarkResourceTypes);

export const users = pgTable("users", {
  id: uuid("id").unique().notNull().primaryKey(),
  email: text("email").unique().notNull(),
  displayName: text("displayName").notNull(),
  firstName: text("firstName").notNull(),
  gender: genderEnum("gender").notNull(),
  lastName: text("lastName").notNull(),
  semester: smallint("semester"),
  stripeCustomerId: text("stripeCustomerId"),
  university: text("university").notNull()
});

export type UserInsert = InferInsertModel<typeof users>;
export type User = InferSelectModel<typeof users>;

export const bookmarks = pgTable("bookmarks", {
  id: uuid("id").defaultRandom().unique().notNull(),
  userId: uuid("userId").references(() => users.id, { onDelete: "no action" }).notNull(),
  resourceType: resourceTypeEnum("resourceType").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  resourceId: uuid("resourceId").notNull()
}, table => ({
  unq: unique().on(table.resourceType, table.resourceId, table.userId),
}));

export type BookmarkInsert = InferInsertModel<typeof bookmarks>;
export type Bookmark = InferSelectModel<typeof bookmarks>;

export const uploadFolders = pgTable("uploadFolders", {
  id: uuid("id").defaultRandom().unique().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  userId: uuid("userId").references(() => users.id, { onDelete: "no action" }).notNull(),
  name: text("name").notNull()
});

export type UploadFolderInsert = InferInsertModel<typeof uploadFolders>;
export type UploadFolder = InferSelectModel<typeof uploadFolders>;

export const uploadedFiles = pgTable("uploadedFiles", {
  id: uuid("id").defaultRandom().unique().notNull(),
  userId: uuid("userId").references(() => users.id, { onDelete: "no action" }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  folderId: uuid("folderId").references(() => uploadFolders.id, { onDelete: "no action" }),
  serverFilename: text("serverFilename").notNull(),
  originalFilename: text("originalFilename").notNull(),
  sizeInBytes: integer("sizeInBytes").notNull(),
  fileExtension: text("fileExtension").notNull()
});

export type UploadedFileInsert = InferInsertModel<typeof uploadedFiles>;
export type UploadedFile = InferSelectModel<typeof uploadedFiles>;
