import { db } from "@/db/connection";
import { contentViews } from "@/db/schema";
import { addUserToCrmUpdateQueue } from "@/lib/clickup/utils";
import { addContentItemViewSchema } from "@/schemas/views/addContentItemView.schema";
import { getContentItemViewsSchema } from "@/schemas/views/getContentItemViews.schema";
import { getLastViewedContentItemsSchema } from "@/schemas/views/getLastViewedContentItems.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import {
  and, desc, eq, gt, sql
} from "drizzle-orm";
import postgres from "postgres";

export const viewsRouter = createTRPCRouter({
  addContentItemView: protectedProcedure
    .input(addContentItemViewSchema)
    .mutation(async ({ ctx: { userId }, input: { itemId, itemType } }) =>
    {
      // only allow one view per minute

      const now = new Date();
      const rateLimitTimeframe = new Date(now.getTime() - 1 * 1000);

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
  /* getViewsHistory: protectedProcedure
    .input(z.object({
      /!* cursor: z.object({
        index: z.number().int().min(0).nullish()
      }),
      limit: z.number().min(1).max(50)*!/
    }))
    .query(async ({ ctx: { userId }, input: { /!* cursor, limit*!/ } }) =>
    {
      const articlesQuery = db
        .select({
          itemId: articlesViews.articleId,
          viewedAt: articlesViews.createdAt,
        })
        .from(articlesViews)
        .where(eq(articlesViews.userId, userId));

      const casesQuery = db
        .select({
          itemId: casesViews.caseId,
          viewedAt: casesViews.createdAt,
        })
        .from(casesViews)
        .where(eq(casesViews.userId, userId));

      const test = unionAll(articlesQuery, casesQuery);

      console.log(test.toSQL());

      const result = await test;

      console.log(result);

      return casesQuery;
    }),*/
});
