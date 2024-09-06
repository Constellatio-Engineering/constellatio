/* eslint-disable @typescript-eslint/naming-convention,no-multiple-empty-lines */

import type { ProfilePictureSql, UserSql } from "@/db/schema";

type Tables = UserSql | ProfilePictureSql;

// ============ COMMON ============
type InsertPayload = {
  old_record: null;
  record: Tables["columns"];
  schema: string;
  table: string;
  type: "INSERT";
};
type UpdatePayload = {
  old_record: Tables["columns"];
  record: Tables["columns"];
  schema: string;
  table: Tables["table"];
  type: "UPDATE";
};

type DeletePayload = {
  old_record: Tables["columns"];
  record: null;
  schema: string;
  table: string;
  type: "DELETE";
};

// ============ USER ============
interface InsertUserPayload extends InsertPayload
{
  record: UserSql["columns"];
  table: UserSql["table"];
}

interface UpdateUserPayload extends UpdatePayload
{
  old_record: UserSql["columns"];
  record: UserSql["columns"];
  table: UserSql["table"];
}

interface DeleteUserPayload extends DeletePayload
{
  old_record: UserSql["columns"];
  table: UserSql["table"];
}

type UserPayload = InsertUserPayload | UpdateUserPayload | DeleteUserPayload;



// ============ PROFILE PICTURE ============
interface InsertProfilePicturePayload extends InsertPayload
{
  record: ProfilePictureSql["columns"];
  table: ProfilePictureSql["table"];
}

interface UpdateProfilePicturePayload extends UpdatePayload
{
  old_record: ProfilePictureSql["columns"];
  record: ProfilePictureSql["columns"];
  table: ProfilePictureSql["table"];
}

interface DeleteProfilePicturePayload extends DeletePayload
{
  old_record: ProfilePictureSql["columns"];
  table: ProfilePictureSql["table"];
}

type ProfilePicturePayload = InsertProfilePicturePayload | UpdateProfilePicturePayload | DeleteProfilePicturePayload;



// ============ ALL ============
export type WebhookPayload =
  | UserPayload
  | ProfilePicturePayload
;
