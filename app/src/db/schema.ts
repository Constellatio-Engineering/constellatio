/* eslint-disable sort-keys-fix/sort-keys-fix */
import {
  varchar, timestamp, text, pgTable, integer, serial, pgEnum
} from "drizzle-orm/pg-core";

export const providerEnum = pgEnum("provider", ["apple", "email", "google"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  password: varchar("password", { length: 100 }),
  googleId: varchar("google_id", { length: 100 }),
  appleId: varchar("apple_id", { length: 100 }),
  provider: providerEnum("provider").notNull(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: varchar("title", { length: 256 }).notNull(),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const profiles = pgTable("profiles", {
  displayName: text("displayName"),
  firstName: text("firstName"),
  gender: text("gender"),
  id: signUpData.user?.id ?? "",
  lastName: body.lastName,
  semester: body.semester,
  university: body.university,
});
