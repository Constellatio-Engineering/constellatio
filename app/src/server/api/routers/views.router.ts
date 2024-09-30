import { db } from "@/db/connection";
import {
  articlesViews, casesViews
} from "@/db/schema";
import { addUserToCrmUpdateQueue } from "@/lib/clickup/utils";
import { addArticleViewSchema } from "@/schemas/views/addArticleView.schema";
import { addCaseViewSchema } from "@/schemas/views/addCaseView.schema";
import { getArticleViewsSchema } from "@/schemas/views/getArticleViews.schema";
import { getCaseViewsSchema } from "@/schemas/views/getCaseViews.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { desc, eq, sql } from "drizzle-orm";

export const viewsRouter = createTRPCRouter({
  addArticleView: protectedProcedure
    .input(addArticleViewSchema)
    .mutation(async ({ ctx: { userId }, input: { articleId } }) =>
    {
      await db
        .insert(articlesViews)
        .values({ articleId, userId })
        .onConflictDoUpdate({
          set: { updatedAt: new Date() },
          target: [articlesViews.articleId, articlesViews.userId],
        });
      await addUserToCrmUpdateQueue(userId);
    }),
  addCaseView: protectedProcedure
    .input(addCaseViewSchema)
    .mutation(async ({ ctx: { userId }, input: { caseId } }) =>
    {
      await db
        .insert(casesViews)
        .values({ caseId, userId })
        .onConflictDoUpdate({
          set: { updatedAt: new Date() },
          target: [casesViews.caseId, casesViews.userId],
        });

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
      const articleViews = await db.query.articlesViews.findMany({
        columns: { articleId: true },
        limit: 3,
        orderBy: [desc(articlesViews.updatedAt)],
        where: eq(articlesViews.userId, userId)
      });

      return articleViews.map(({ articleId }) => articleId);
    }),
  getLastViewedCases: protectedProcedure
    .query(async ({ ctx: { userId } }) =>
    {
      const caseViews = await db.query.casesViews.findMany({
        columns: { caseId: true },
        limit: 3,
        orderBy: [desc(casesViews.updatedAt)],
        where: eq(casesViews.userId, userId)
      });

      return caseViews.map(({ caseId }) => caseId);
    }),
});
