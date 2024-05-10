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
  limiter: Ratelimit.fixedWindow(1, `${env.NEXT_PUBLIC_USER_ACTIVITY_PING_INTERVAL_SECONDS} s`), // allow 1 request for every ping interval
  redis: kv,
});

export const userActivityRouter = createTRPCRouter({
  getUsageTime: protectedProcedure
    .input(getUsageTimeSchema)
    .query(async ({ ctx: { userId }, input }) =>
    {
      const _startInUsersLocalTimezone = getDateInLocalTimezone(input.start, input.timeZoneOffset);
      const _endInUsersLocalTimezone = getDateInLocalTimezone(input.end, input.timeZoneOffset);

      const start = new Date(_startInUsersLocalTimezone.toISOString());
      const end = new Date(_endInUsersLocalTimezone.toISOString());

      start.setUTCHours(0, 0, 0, 0);
      end.setUTCHours(23, 59, 59, 999);

      const dailyUsageSubquery = db
        .select({
          date: sql<Date>`date_trunc(${input.interval}, ${pings.createdAt})`.as("date"),
          totalUsage: sum(pings.pingInterval).as("totalUsage"),
          userId: pings.userId,
        })
        .from(pings)
        .where(
          and(
            eq(pings.userId, userId),
            gte(pings.createdAt, start),
            lte(pings.createdAt, end)
          )
        )
        .groupBy(sql<Date>`date`, pings.userId)
        .as("DailyUsage");

      const dateSeriesSubquery = db
        .select({
          dateFromSeries: sql`d.date`
            .mapWith(value =>
            {
              const asDate = new Date(value);
              const test = getDateInLocalTimezone(asDate, input.timeZoneOffset);
              console.log("decoder", asDate, test);
              return getDateInLocalTimezone(asDate, input.timeZoneOffset);
            })
            .as("dateFromSeries"),
        })
        .from(sql`generate_series(date_trunc(${input.interval}, ${start.toISOString()}::timestamp), date_trunc(${input.interval}, ${end.toISOString()}::timestamp), ${`1 ${input.interval}`}) as d(date)`)
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

      console.log(usageTimeQuery.toSQL());

      const usageTimePerInterval = await usageTimeQuery;

      console.log(JSON.stringify(usageTimePerInterval, null, 2));

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
        throw new RateLimitError();
      }

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
