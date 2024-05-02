import { db } from "@/db/connection";
import { pings as pingsTable } from "@/db/schema";
import { env } from "@/env.mjs";
import { pingSchema } from "@/schemas/userActivity/ping.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { RateLimitError } from "@/utils/serverError";

import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { and, eq, sql, sum } from "drizzle-orm";

const rateLimit = new Ratelimit({
  limiter: Ratelimit.fixedWindow(1, `${env.NEXT_PUBLIC_USER_ACTIVITY_PING_INTERVAL_SECONDS - 1} s`), // allow 1 request for every ping interval
  redis: kv,
});

export const userActivityRouter = createTRPCRouter({
  getUsageTime: protectedProcedure
    .query(async ({ ctx: { userId } }) =>
    {
      const dailyUsageSubquery = db
        .select({
          date: sql<Date>`date_trunc('day', ${pingsTable.createdAt})`.as("date"),
          totalUsage: sum(pingsTable.pingInterval).as("totalUsage"),
          userId: pingsTable.userId,
        })
        .from(pingsTable)
        .where(
          and(
            eq(pingsTable.userId, userId),
            sql`${pingsTable.createdAt} >= current_date - interval '7 days'`,
            sql`${pingsTable.createdAt} <= current_date + interval '1 day'`
          )
        )
        .groupBy(sql`Date`, pingsTable.userId)
        .as("DailyUsage");

      const daysSeriesSubquery = db
        .select({
          dateFromSeries: sql<Date>`d.date`.as("dateFromSeries"),
        })
        .from(sql`generate_series(current_date - interval '7 days', current_date, '1 day') as d(date)`)
        .as("DaysSeries");

      const pingsQuery = db
        .select({
          date: daysSeriesSubquery.dateFromSeries,
          totalUsage: sql<number>`COALESCE(${dailyUsageSubquery.totalUsage}, 0)`
        })
        .from(daysSeriesSubquery)
        .leftJoin(dailyUsageSubquery, eq(dailyUsageSubquery.date, daysSeriesSubquery.dateFromSeries));

      const pings2 = await pingsQuery;

      console.log(pings2);

      return pings2;
    }),
  ping: protectedProcedure
    .input(pingSchema)
    .mutation(async ({ ctx: { userId }, input: { href: _href, path, search } }) =>
    {
      const rateLimitResult = await rateLimit.limit(userId);

      if(!rateLimitResult.success)
      {
        console.warn("Rate limit exceeded for ping event. This should not happen since the client should not emit pings faster than the rate limit allows.");
        throw new RateLimitError();
      }

      console.log(`PING from user '${userId}' on ${path}${search != null ? search : ""}`);

      await db.insert(pingsTable).values({
        path,
        pingInterval: env.NEXT_PUBLIC_USER_ACTIVITY_PING_INTERVAL_SECONDS,
        search,
        userId,
      });

      return "PONG";
    }),
});
