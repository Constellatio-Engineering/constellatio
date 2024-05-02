import { db } from "@/db/connection";
import { pings as pingsTable } from "@/db/schema";
import { env } from "@/env.mjs";
import { pingSchema } from "@/schemas/userActivity/ping.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { RateLimitError } from "@/utils/serverError";

import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { and, eq, sql } from "drizzle-orm";

const rateLimit = new Ratelimit({
  limiter: Ratelimit.fixedWindow(1, `${env.NEXT_PUBLIC_USER_ACTIVITY_PING_INTERVAL_SECONDS - 1} s`), // allow 1 request for every ping interval
  redis: kv,
});

export const userActivityRouter = createTRPCRouter({
  getUsageTime: protectedProcedure
    .query(async ({ ctx: { userId } }) =>
    {
      /* const pings = await db
        .select({
          createdAt: pingsTable.createdAt,
          pingInterval: pingsTable.pingInterval,
        })
        .from(pingsTable)
        .where(
          eq(pingsTable.userId, userId),
        );*/

      const test = await db
        .select({
          date: sql`date_trunc('day', ${pingsTable.createdAt}) AS Date`,
          totalUsage: sql<number>`SUM(${pingsTable.pingInterval}) AS TotalUsage`,
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
        // .as("DailyUsage")
      ;

      console.log(test);

      /* const subquery = db
        .select({
          date: sql`date_trunc('day', ${pingsTable.createdAt}) AS Date`,
          totalUsage: sql<number>`SUM(${pingsTable.pingInterval}) AS TotalUsage`,
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
        .as("DailyUsage")
      ;

      const pings2 = await db
        .select({
          date: sql`d.Date`,
          totalUsage: sql<number>`COALESCE("TotalUsage", 0)`
        })
        .from(sql`generate_series(current_date - interval '7 days', current_date, '1 day') as d(Date)`)
        .leftJoin(subquery, eq(subquery.date, sql`d.Date`))
      ;

      console.log(pings2);

      return pings2;*/

      return null;
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

      console.trace(`PING from user '${userId}' on ${path}${search != null ? search : ""}`);

      await db.insert(pingsTable).values({
        path,
        pingInterval: env.NEXT_PUBLIC_USER_ACTIVITY_PING_INTERVAL_SECONDS,
        search,
        userId,
      });

      return "PONG";
    }),
});
