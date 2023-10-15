import { db } from "@/db/connection";
import {
  articles_views, cases_views
} from "@/db/schema";
import { addArticleViewSchema } from "@/schemas/views/addArticleView.schema";
import { addCaseViewSchema } from "@/schemas/views/addCaseView.schema";
import { getArticleViewsSchema } from "@/schemas/views/getArticleViews.schema";
import { getCaseViewsSchema } from "@/schemas/views/getCaseViews.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { and, eq, sql } from "drizzle-orm";

export const viewsRouter = createTRPCRouter({
  addArticleView: protectedProcedure
    .input(addArticleViewSchema)
    .mutation(async ({ ctx: { userId }, input: { articleId } }) =>
    {
      const existingView = await db.query.articles_views.findFirst({
        where: and(
          eq(articles_views.userId, userId),
          eq(articles_views.articleId, articleId),
        )
      });

      if(existingView)
      {
        return;
      }

      await db.insert(articles_views).values({ articleId, userId });
    }),
  addCaseView: protectedProcedure
    .input(addCaseViewSchema)
    .mutation(async ({ ctx: { userId }, input: { caseId } }) =>
    {
      const existingView = await db.query.cases_views.findFirst({
        where: and(
          eq(cases_views.userId, userId),
          eq(cases_views.caseId, caseId),
        )
      });

      if(existingView)
      {
        return;
      }
      
      await db.insert(cases_views).values({ caseId, userId });
    }),
  getArticleViews: protectedProcedure
    .input(getArticleViewsSchema)
    .query(async ({ input: { articleId } }) =>
    {
      const [result] = await db.select({ count: sql<number>`count(*)` }).from(articles_views).where(eq(articles_views.articleId, articleId));
      return result?.count ?? 0;
    }),
  getCaseViews: protectedProcedure
    .input(getCaseViewsSchema)
    .query(async ({ input: { caseId } }) =>
    {
      const [result] = await db.select({ count: sql<number>`count(*)` }).from(cases_views).where(eq(cases_views.caseId, caseId));
      return result?.count ?? 0;
    }),
});
