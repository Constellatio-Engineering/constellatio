import { and, asc, between, desc, eq } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { streak, streakActivities } from "@constellatio/db/schema";
import { differenceInDays, startOfTomorrow, subDays } from "date-fns";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const streakRouter = createTRPCRouter({
  getStreak: protectedProcedure.query(async ({ ctx: { userId } }) =>
  {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const latestStreakQuery = await db
      .select()
      .from(streak)
      .where(and(eq(streak.userId, userId), eq(streak.streakAlive, true)))
      .orderBy(desc(streak.startDate))
      .limit(1);

    const latestStreak = latestStreakQuery[0];

    if(!latestStreak) 
    {
      return null;
    }

    const startDate = new Date(latestStreak.startDate);
    startDate.setHours(0, 0, 0, 0);
    const daysSinceStartInclToday = differenceInDays(today, startDate) + 1;
    const streakParts = Math.ceil(daysSinceStartInclToday / 7);
    const numPauseDays = streakParts * 2;

    // cast to number due to default value of satisfiedDays
    const totalDays = (latestStreak.satisfiedDays as number) + numPauseDays;

    if(totalDays < daysSinceStartInclToday) 
    {
      await db.update(streak)
        .set({ 
          lastCheckDate: new Date(),
          streakAlive: false
        })
        .where(eq(streak.id, latestStreak.id));

      return null;
    }

    if(latestStreak.lastCheckDate < new Date()) 
    {
      await db.update(streak)
        .set({ 
          lastCheckDate: new Date(),
          streakAlive: true
        })
        .where(eq(streak.id, latestStreak.id));
    }

    return {
      numStreakDays: daysSinceStartInclToday,
      ...latestStreak,
    };
  }),
  getWeeklyStreak: protectedProcedure.query(async ({ ctx: { userId } }) =>
  {
    const end = startOfTomorrow();
    const sevenDaysAgo = subDays(new Date(), 6);
    
    const activities = await db.select()
      .from(streakActivities)
      .where(
        and(
          eq(streakActivities.userId, userId), 
          between(streakActivities.createdAt, sevenDaysAgo, end)
        )
      )
      .orderBy(asc(streakActivities.createdAt)); 
    
    if(activities.length === 0) 
    {
      return [false, false, false, false, false, false, false];
    }

    const weeklyStreak = new Array(7).fill(false) as boolean[];
    const today = new Date();
    
    activities.forEach(activity => 
    {
      const activityDate = new Date(activity.createdAt);
      const dayDifference = Math.floor((today.getTime() - activityDate.getTime()) / (1000 * 3600 * 24));
      
      if(dayDifference >= 0 && dayDifference < 7) 
      {
        weeklyStreak[6 - dayDifference] = true;
      }
    });

    return weeklyStreak;
  })
});

