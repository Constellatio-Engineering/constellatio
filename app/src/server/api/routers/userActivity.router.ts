import { db } from "@/db/connection";
import { pings } from "@/db/schema";
import { env } from "@/env.mjs";
import { getUsageTimeSchema } from "@/schemas/userActivity/getUsageTime.schema";
import { pingSchema } from "@/schemas/userActivity/ping.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getCurrentDateInLocalTimezone, getDateInLocalTimezone } from "@/utils/dates";
import { RateLimitError } from "@/utils/serverError";

import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import {
  and, asc, eq, gte, lte, sql, sum
} from "drizzle-orm";

const rateLimit = new Ratelimit({
  limiter: Ratelimit.fixedWindow(1, `${env.NEXT_PUBLIC_USER_ACTIVITY_PING_INTERVAL_SECONDS - 1} s`), // allow 1 request for every ping interval
  redis: kv,
});

export const userActivityRouter = createTRPCRouter({
  getUsageTime: protectedProcedure
    .input(getUsageTimeSchema)
    .query(async ({
      ctx: { userId },
      input: {
        end,
        interval,
        start,
        timeZoneOffset
      } 
    }) =>
    {
      console.log(`Getting usage time between ${start.toLocaleDateString("de")} and ${end.toLocaleDateString("de")} with interval ${interval}`);

      const startInUsersLocalTimezone = getDateInLocalTimezone(start, timeZoneOffset);
      const endInUsersLocalTimezone = getDateInLocalTimezone(end, timeZoneOffset);
      endInUsersLocalTimezone.setDate(endInUsersLocalTimezone.getDate() + 1);
      endInUsersLocalTimezone.setMilliseconds(endInUsersLocalTimezone.getMilliseconds() - 1);

      console.log("startInUsersLocalTimezone", startInUsersLocalTimezone);
      console.log("endInUsersLocalTimezone", endInUsersLocalTimezone);

      const dailyUsageSubquery = db
        .select({
          date: sql<Date>`date_trunc(${interval}, ${pings.createdAt})`.as("date"),
          totalUsage: sum(pings.pingInterval).as("totalUsage"),
          userId: pings.userId,
        })
        .from(pings)
        .where(
          and(
            eq(pings.userId, userId),
            gte(pings.createdAt, startInUsersLocalTimezone),
            lte(pings.createdAt, endInUsersLocalTimezone)
          )
        )
        .groupBy(sql<Date>`date`, pings.userId)
        .as("DailyUsage");

      const dateSeriesSubquery = db
        .select({
          dateFromSeries: sql<Date>`d.date`.as("dateFromSeries"),
        })
        .from(sql`generate_series(date_trunc(${interval}, ${startInUsersLocalTimezone}), date_trunc(${interval}, ${endInUsersLocalTimezone}), ${`1 ${interval}`}) as d(date)`)
        .as("DaysSeries");

      const usageTimeQuery = db
        .select({
          date: dateSeriesSubquery.dateFromSeries,
          totalUsage: sql<number>`COALESCE(${dailyUsageSubquery.totalUsage}, 0)`.mapWith(Number)
        })
        .from(dateSeriesSubquery)
        .leftJoin(dailyUsageSubquery, and(
          eq(dailyUsageSubquery.date, dateSeriesSubquery.dateFromSeries),
          eq(dailyUsageSubquery.userId, userId)
        ))
        .orderBy(asc(dateSeriesSubquery.dateFromSeries));

      const usageTimePerInterval = await usageTimeQuery;
      return usageTimePerInterval;
    }),
  ping: protectedProcedure
    .input(pingSchema)
    .mutation(async ({
      ctx: { userId },
      input: {
        href: _href,
        path,
        search,
        timeZoneOffset
      } 
    }) =>
    {
      const rateLimitResult = await rateLimit.limit(userId);

      if(!rateLimitResult.success)
      {
        console.warn("Rate limit exceeded for ping event. This should not happen since the client should not emit pings faster than the rate limit allows.");
        throw new RateLimitError();
      }

      console.log(`PING from user '${userId}' on ${path}${search != null ? search : ""}`);

      const userLocalTimestamp = getCurrentDateInLocalTimezone(timeZoneOffset);

      await db.insert(pings).values({
        createdAt: userLocalTimestamp,
        path,
        pingInterval: env.NEXT_PUBLIC_USER_ACTIVITY_PING_INTERVAL_SECONDS,
        search,
        userId,
      });

      return "PONG";
    }),
});
