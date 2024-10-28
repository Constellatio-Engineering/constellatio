import { and, eq, sql } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { streak, streakActivities } from "@constellatio/db/schema";
import { StreakActivityType } from "@constellatio/shared-types";

export const createStreakActivity = async (
  activityType: StreakActivityType,
  userId: string,
) =>
{
  const existingEntry = await db
    .select()
    .from(streakActivities)
    .where(
      and(
        eq(streakActivities.userId, userId),
        eq(streakActivities.createdAt, new Date())
      )
    )
    .limit(1);
  
  if(existingEntry.length > 0)
  {
    return;
  }

  await db.insert(streakActivities).values({ activityType, userId });

  // check if a streak is alive
  const aliveStreak = await db.select()
    .from(streak)
    .where(
      and(
        eq(streak.userId, userId),
        eq(streak.streakAlive, true)
      ))
    .limit(1);

  const currentStreak = aliveStreak[0];

  if(currentStreak) 
  {
    const today = new Date();

    if(currentStreak.lastSatisfiedDate < today) 
    {
      await db.update(streak)
        .set({ 
          lastSatisfiedDate: today,
          satisfiedDays: sql`${streak.satisfiedDays} + 1`
        })
        .where(eq(streak.id, currentStreak.id));
    }
    return;
  }

  await db.insert(streak).values({ userId });
};
