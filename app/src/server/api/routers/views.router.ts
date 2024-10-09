import { db } from "@/db/connection";
import { articlesViews, casesViews } from "@/db/schema";
import { addUserToCrmUpdateQueue } from "@/lib/clickup/utils";
import { addArticleViewSchema } from "@/schemas/views/addArticleView.schema";
import { addCaseViewSchema } from "@/schemas/views/addCaseView.schema";
import { getArticleViewsSchema } from "@/schemas/views/getArticleViews.schema";
import { getCaseViewsSchema } from "@/schemas/views/getCaseViews.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { desc, eq, sql } from "drizzle-orm";

/* async function getLastViewedItems<Table extends (typeof articlesViews | typeof casesViews)>(table: Table, idColumn: any, userId: string)
{
  const distinctViewsSubquery = db
    .select({
      createdAt: sql`MAX(${table.createdAt})`.as("maxCreatedAt"),
      itemId: table[idColumn],
    })
    .from(table)
    .where(eq(table.userId, userId))
    .groupBy(table[idColumn])
    .as("distinct_views");

  const views = await db
    .select({
      itemId: distinctViewsSubquery.itemId,
    })
    .from(distinctViewsSubquery)
    .orderBy(desc(distinctViewsSubquery.createdAt))
    .limit(3);

  return views;
}*/

export const viewsRouter = createTRPCRouter({
  addArticleView: protectedProcedure
    .input(addArticleViewSchema)
    .mutation(async ({ ctx: { userId }, input: { articleId } }) =>
    {
      await db.insert(articlesViews).values({ articleId, userId });
      await addUserToCrmUpdateQueue(userId);
    }),
  addCaseView: protectedProcedure
    .input(addCaseViewSchema)
    .mutation(async ({ ctx: { userId }, input: { caseId } }) =>
    {
      await db.insert(casesViews).values({ caseId, userId });
      await addUserToCrmUpdateQueue(userId);
    }),
  getAllSeenArticles: protectedProcedure
    .query(async ({ ctx: { userId } }) =>
    {
      const seenArticles = await db
        .select({
          articleId: articlesViews.articleId,
        })
        .from(articlesViews)
        .where(eq(articlesViews.userId, userId));

      return seenArticles.map(seenArticle => seenArticle.articleId);
    }),
  getArticleViews: protectedProcedure
    .input(getArticleViewsSchema)
    .query(async ({ input: { articleId } }) =>
    {
      const [result] = await db
        .select({ count: sql<number>`cast(count(*) as int)` })
        .from(articlesViews)
        .where(eq(articlesViews.articleId, articleId));

      return result?.count ?? 0;
    }),
  getCaseViews: protectedProcedure
    .input(getCaseViewsSchema)
    .query(async ({ input: { caseId } }) =>
    {
      const [result] = await db
        .select({ count: sql<number>`cast(count(*) as int)` })
        .from(casesViews)
        .where(eq(casesViews.caseId, caseId));

      return result?.count ?? 0;
    }),
  getLastViewedArticles: protectedProcedure
    .query(async ({ ctx: { userId } }) =>
    {
      const distinctArticleViewsSubquery = db
        .select({
          articleId: articlesViews.articleId,
          createdAt: sql`MAX(${articlesViews.createdAt})`.mapWith(articlesViews.createdAt).as("maxCreatedAt"),
        })
        .from(articlesViews)
        .where(eq(articlesViews.userId, userId))
        .groupBy(articlesViews.articleId)
        .as("distinct_views");

      const articleViews = await db
        .select({
          articleId: distinctArticleViewsSubquery.articleId,
          viewedDate: distinctArticleViewsSubquery.createdAt,
        })
        .from(distinctArticleViewsSubquery)
        .orderBy(desc(distinctArticleViewsSubquery.createdAt))
        .limit(3);

      return articleViews;
    }),
  getLastViewedCases: protectedProcedure
    .query(async ({ ctx: { userId } }) =>
    {
      const distinctCaseViewsSubquery = db
        .select({
          caseId: casesViews.caseId,
          createdAt: sql`MAX(${casesViews.createdAt})`.mapWith(casesViews.createdAt).as("maxCreatedAt"),
        })
        .from(casesViews)
        .where(eq(casesViews.userId, userId))
        .groupBy(casesViews.caseId)
        .as("distinct_views");

      const caseViews = await db
        .select({
          caseId: distinctCaseViewsSubquery.caseId,
          viewedDate: distinctCaseViewsSubquery.createdAt,
        })
        .from(distinctCaseViewsSubquery)
        .orderBy(desc(distinctCaseViewsSubquery.createdAt))
        .limit(3);

      return caseViews;
    }),
});
