import { db } from "@/db/connection";
import {
  type ForumQuestionSql, pings, streak, type PingSql, type ForumAnswerSql, type CaseProgressSql 
} from "@/db/schema";
import { createStreakActivity } from "@/server/api/services/streak.services";

import { and, eq, gte, sql } from "drizzle-orm";

export const streakHandlerPingInsert = async (record: PingSql["columns"]): Promise<void> =>
{
  const { UserId } = record;

  const latestStreakQuery = await db
    .select()
    .from(streak)
    .where(and(eq(streak.userId, UserId), eq(streak.lastSatisfiedDate, new Date())));

  if(latestStreakQuery.length > 0)
  {
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result = await db.select({
    totalPingInterval: sql<number>`Cast(SUM(${pings.pingInterval}) as int)`,
  })
    .from(pings)
    .where(
      and(
        eq(pings.userId, UserId),
        gte(pings.createdAt, today)
      )
    );

  const totalPingInterval = result[0]?.totalPingInterval ?? 0;
  console.log(`Total pingInterval for user ${UserId} today: ${totalPingInterval}`);

  // 1 hour
  if(totalPingInterval >= 3600)
  {
    console.log(`Creating streak activity for user ${UserId} with activity type "time"`);
    await createStreakActivity("time", UserId);
  }
};

export const streakHandlerForumQuestionInsert = async (record: ForumQuestionSql["columns"]): Promise<void> =>
{
  const { UserId } = record;

  await createStreakActivity("forumActivity", UserId);
};

export const streakHandlerForumAnswerInsert = async (record: ForumAnswerSql["columns"]): Promise<void> =>
{
  const { UserId } = record;

  await createStreakActivity("forumActivity", UserId);
};

export const streakHandlerCaseProgressInsert = async (record: CaseProgressSql["columns"]): Promise<void> =>
{
  const { ProgressState, UserId } = record;
  if(ProgressState === "completed")
  {
    await createStreakActivity("solvedCase", UserId);
  }
};

export const streakHandlerCaseProgressUpdate = async (record: CaseProgressSql["columns"]): Promise<void> =>
{
  const { ProgressState, UserId } = record;
  if(ProgressState === "completed")
  {
    await createStreakActivity("solvedCase", UserId);
  }
};
