/* eslint-disable sort-keys-fix/sort-keys-fix */
import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import {
  text, pgTable, integer, pgEnum, uuid, serial, smallint, unique, timestamp
} from "drizzle-orm/pg-core";

export const allGenderIdentifiers = ["male", "female", "diverse",] as const;
export type GenderIdentifier = typeof allGenderIdentifiers[number];

export const allBookmarkResourceTypes = ["article", "case"] as const;
export type BookmarkResourceType = typeof allBookmarkResourceTypes[number];

export const genderEnum = pgEnum("gender", allGenderIdentifiers);
export const resourceTypeEnum = pgEnum("resourceType", allBookmarkResourceTypes);

export const usersTable = pgTable("users", {
  id: uuid("id").unique().notNull().primaryKey(),
  email: text("email").unique().notNull(),
  displayName: text("displayName").notNull(),
  firstName: text("firstName").notNull(),
  gender: genderEnum("gender").notNull(),
  lastName: text("lastName").notNull(),
  semester: smallint("semester"),
  university: text("university").notNull()
});

export type UserInsert = InferInsertModel<typeof usersTable>;

export const bookmarksTable = pgTable("bookmarks", {
  id: serial("id").primaryKey(),
  uuid: uuid("uuid").defaultRandom().unique().notNull(),
  userId: uuid("userId").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
  resourceType: resourceTypeEnum("resourceType").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  resourceId: uuid("resourceId").notNull()
}, table => ({
  unq: unique().on(table.resourceType, table.resourceId, table.userId),
}));

export type BookmarkInsert = InferInsertModel<typeof bookmarksTable>;
export type Bookmark = InferSelectModel<typeof bookmarksTable>;

export const uploadsTable = pgTable("uploads", {
  id: serial("id").primaryKey(),
  uuid: uuid("uuid").defaultRandom().unique().notNull(),
  clientSideUuid: uuid("clientSideUuid").notNull(),
  userId: uuid("userId").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  filename: text("filename").notNull(),
  originalFilename: text("originalFilename").notNull(),
  sizeInBytes: integer("sizeInBytes").notNull(),
  fileExtension: text("fileExtension").notNull()
});

export type UploadInsert = InferInsertModel<typeof uploadsTable>;
export type Upload = InferSelectModel<typeof uploadsTable>;
