import { env } from "@/env.mjs";

import { and, eq, gte, sum } from "drizzle-orm";

import { db } from "@/db/connection";
import {
  type CaseProgressSql, type ForumAnswerSql, type ForumQuestionSql, pings, type PingSql, streak, type StreakSql 
} from "@/db/schema";
import { addBadgeForUser } from "@/server/api/services/badges.services";
import { createStreakActivity } from "@/server/api/services/streak.services";

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

  const [result] = await db.select({
    totalPingInterval: sum(pings.pingInterval).mapWith(Number),
  })
    .from(pings)
    .where(
      and(
        eq(pings.userId, UserId),
        gte(pings.createdAt, today)
      )
    );

  const totalPingInterval = result?.totalPingInterval ?? 0;

  if(totalPingInterval >= env.NEXT_PUBLIC_STREAK_DAILY_TIME_ACTIVITY_THRESHOLD_SECONDS)
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

const handleBadges = async (satisfiedDays: number | null, userId: string) =>
{
  if(!satisfiedDays)
  {
    return;
  }

  if(satisfiedDays >= 5)
  {
    await addBadgeForUser({ badgeIdentifier: "streak-14", userId });
  } 
  if(satisfiedDays >= 42)
  {
    await addBadgeForUser({ badgeIdentifier: "streak-42", userId });
  } 
  if(satisfiedDays >= 84)
  {
    await addBadgeForUser({ badgeIdentifier: "streak-84", userId });
  }
};

export const streakHandlerStreakInsert = async (record: StreakSql["columns"]): Promise<void> =>
{
  const { SatisfiedDays, UserId } = record;
  await handleBadges(SatisfiedDays, UserId); 
};

export const streakHandlerStreakUpdate = async (record: StreakSql["columns"]): Promise<void> =>
{
  const { SatisfiedDays, UserId } = record;
  await handleBadges(SatisfiedDays, UserId);
};
