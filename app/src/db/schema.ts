/* eslint-disable sort-keys-fix/sort-keys-fix */
import { type InferInsertModel } from "drizzle-orm";
import {
  text, pgTable, integer, pgEnum, uuid, serial, smallint
} from "drizzle-orm/pg-core";

export const allGenderIdentifiers = ["male", "female", "diverse",] as const;
export type GenderIdentifier = typeof allGenderIdentifiers[number];

export const allBookmarkResourceTypes = ["article", "case"] as const;
export type BookmarkResourceType = typeof allBookmarkResourceTypes[number];

export const genderEnum = pgEnum("gender", allGenderIdentifiers);
export const resourceTypeEnum = pgEnum("resourceType", allBookmarkResourceTypes);

export const usersTable = pgTable("users", {
  id: uuid("id").unique().notNull(),
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
  resourceId: uuid("resourceId").notNull()
});

export type BookmarkInsert = InferInsertModel<typeof bookmarksTable>;
