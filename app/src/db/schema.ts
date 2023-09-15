/* eslint-disable sort-keys-fix/sort-keys-fix */
import {
  text, pgTable, integer, pgEnum, uuid
} from "drizzle-orm/pg-core";

export const allGenderIdentifiers = [
  "male",
  "female",
  "diverse",
] as const;
export type GenderIdentifier = typeof allGenderIdentifiers[number];

export const genderEnum = pgEnum("gender", allGenderIdentifiers);

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  displayName: text("displayName"),
  firstName: text("firstName"),
  gender: genderEnum("gender"),
  lastName: text("lastName"),
  semester: integer("semester"),
  university: text("university")
});
