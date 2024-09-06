/* eslint-disable @typescript-eslint/naming-convention,no-multiple-empty-lines */

import type {
  CaseProgressSql, ForumAnswerSql, ForumQuestionSql, PingSql, ProfilePictureSql, StreakSql, UserSql 
} from "@/db/schema";

type Tables =
  | UserSql
  | ProfilePictureSql
  | PingSql
  | ForumAnswerSql
  | ForumQuestionSql
  | CaseProgressSql
  | StreakSql;

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



// ============ PING ============
interface InsertPingPayload extends InsertPayload
{
  record: PingSql["columns"];
  table: PingSql["table"];
}

type PingPayload = InsertPingPayload;


// ============ FORUM ANSWER ============
interface InsertForumAnswerPayload extends InsertPayload
{
  record: ForumAnswerSql["columns"];
  table: ForumAnswerSql["table"];
}

type ForumAnswerPayload = InsertForumAnswerPayload;


// ============ FORUM QUESTION ============
interface InsertForumQuestionPayload extends InsertPayload
{
  record: ForumQuestionSql["columns"];
  table: ForumQuestionSql["table"];
}

type ForumQuestionPayload = InsertForumQuestionPayload;


// ============ CASE PROGRESS ============
interface InsertCaseProgressPayload extends InsertPayload
{
  record: CaseProgressSql["columns"];
  table: CaseProgressSql["table"];
}

interface UpdateCaseProgressPayload extends UpdatePayload 
{
  old_record: CaseProgressSql["columns"];
  record: CaseProgressSql["columns"];
  table: CaseProgressSql["table"];
}

type CaseProgressPayload = InsertCaseProgressPayload | UpdateCaseProgressPayload;


// ============ STREAK ============
interface InsertStreakPayload extends InsertPayload
{
  record: StreakSql["columns"];
  table: StreakSql["table"];
}

interface UpdateStreakPayload extends UpdatePayload
{
  old_record: StreakSql["columns"];
  record: StreakSql["columns"];
  table: StreakSql["table"];
}

type StreakPayload = InsertStreakPayload | UpdateStreakPayload;


// ============ ALL ============
export type WebhookPayload =
  | UserPayload
  | ProfilePicturePayload
  | PingPayload
  | ForumAnswerPayload
  | ForumQuestionPayload
  | CaseProgressPayload
  | StreakPayload;
