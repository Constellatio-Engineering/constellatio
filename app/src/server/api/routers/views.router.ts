import { db } from "@/db/connection";
import { contentViews } from "@/db/schema";
import { env } from "@/env.mjs";
import { addUserToCrmUpdateQueue } from "@/lib/clickup/utils";
import { addContentItemViewSchema } from "@/schemas/views/addContentItemView.schema";
import { getContentItemViewsSchema } from "@/schemas/views/getContentItemViews.schema";
import { getLastViewedContentItemsSchema } from "@/schemas/views/getLastViewedContentItems.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { InternalServerError } from "@/utils/serverError";

import { type inferProcedureOutput } from "@trpc/server";
import {
  and, desc, eq, gt, lt, type SQL, sql
} from "drizzle-orm";
import postgres from "postgres";
import { z } from "zod";

export const viewsRouter = createTRPCRouter({
  addContentItemView: protectedProcedure
    .input(addContentItemViewSchema)
    .mutation(async ({ ctx: { userId }, input: { itemId, itemType } }) =>
    {
      // only allow one view per minute
      const now = new Date();
      const rateLimitTimeframe = new Date(now.getTime() - 60 * 1000);

      try
      {
        await db.transaction(
          async (trx) =>
          {
            const recentViews = await trx
              .select({ itemId: contentViews.contentItemId })
              .from(contentViews)
              .where(and(
                eq(contentViews.userId, userId),
                eq(contentViews.contentItemId, itemId),
                eq(contentViews.contentItemType, itemType),
                gt(contentViews.createdAt, rateLimitTimeframe)
              ))
              .for("update");  // Locking the row(s) to avoid race conditions

            if(recentViews.length > 0)
            {
              return;
            }

            await trx
              .insert(contentViews)
              .values({ contentItemId: itemId, contentItemType: itemType, userId });
          },
          {
            accessMode: "read write",
            deferrable: true,
            isolationLevel: "serializable"
          }
        );

        await addUserToCrmUpdateQueue(userId);
      }
      catch (e: unknown)
      {
        if(e instanceof postgres.PostgresError && e.code === "40001")
        {
          console.info("Two or more transactions attempted to access the same data at the same time");
        }
        else
        {
          throw e;
        }
      }
    }),
  getAllSeenArticles: protectedProcedure
    .query(async ({ ctx: { userId } }) =>
    {
      const seenArticles = await db
        .select({
          articleId: contentViews.contentItemId,
        })
        .from(contentViews)
        .where(
          and(
            eq(contentViews.userId, userId),
            eq(contentViews.contentItemType, "article")
          )
        );

      return seenArticles.map(seenArticle => seenArticle.articleId);
    }),
  getContentItemViewsCount: protectedProcedure
    .input(getContentItemViewsSchema)
    .query(async ({ input: { itemId, itemType } }) =>
    {
      const [result] = await db
        .select({ count: sql<number>`cast(count(*) as int)` })
        .from(contentViews)
        .where(
          and(
            eq(contentViews.contentItemId, itemId),
            eq(contentViews.contentItemType, itemType)
          )
        );

      return result?.count ?? 0;
    }),
  getLastViewedContentItems: protectedProcedure
    .input(getLastViewedContentItemsSchema)
    .query(async ({ ctx: { userId }, input: { itemType } }) =>
    {
      const distinctViewsSubquery = db
        .select({
          createdAt: sql`MAX(${contentViews.createdAt})`.mapWith(contentViews.createdAt).as("maxCreatedAt"),
          itemId: contentViews.contentItemId,
        })
        .from(contentViews)
        .where(
          and(
            eq(contentViews.userId, userId),
            eq(contentViews.contentItemType, itemType)
          )
        )
        .groupBy(contentViews.contentItemId)
        .as("distinct_views");

      const views = await db
        .select({
          itemId: distinctViewsSubquery.itemId,
          viewedDate: distinctViewsSubquery.createdAt,
        })
        .from(distinctViewsSubquery)
        .orderBy(desc(distinctViewsSubquery.createdAt))
        .limit(3);

      return views;
    }),
  getViewsHistory: protectedProcedure
    .input(z.object({
      cursor: z.number().int().min(0).nullish(),
      initialPageSize: z.number().min(1).max(50),
      loadMorePageSize: z.number().min(1).max(50)
    }))
    .query(async ({ ctx: { userId }, input: { cursor, initialPageSize, loadMorePageSize } }) =>
    {
      // only allow to query a set amount of days back
      const now = new Date();
      const historyLimit = new Date(now.getTime() - env.NEXT_PUBLIC_CONTENT_ITEMS_VIEWS_HISTORY_DAYS_LIMIT * 24 * 60 * 60 * 1000);

      const pageSize = cursor == null ? initialPageSize : loadMorePageSize;
      const queryConditions: SQL[] = [
        eq(contentViews.userId, userId),
        gt(contentViews.createdAt, historyLimit)
      ];

      if(cursor != null)
      {
        queryConditions.push(lt(contentViews.id, cursor));
      }

      const visitedItems = await db
        .select({
          id: contentViews.id,
          itemId: contentViews.contentItemId,
          itemType: contentViews.contentItemType,
          viewedAt: contentViews.createdAt,
        })
        .from(contentViews)
        .where(and(...queryConditions))
        .orderBy(desc(contentViews.createdAt))
        .limit(pageSize + 1);

      const hasNextPage = visitedItems.length > pageSize;
      let nextCursor: number | null = null;

      if(hasNextPage)
      {
        const nextItem = visitedItems.pop();

        if(nextItem == null)
        {
          throw new InternalServerError(new Error("nextItem is null"));
        }

        nextCursor = nextItem.id;
      }

      return { nextCursor, visitedItems };
    }),
});

export type ViewsHistoryItems = inferProcedureOutput<typeof viewsRouter.getViewsHistory>["visitedItems"];
