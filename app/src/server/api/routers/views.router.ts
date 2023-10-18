import { db } from "@/db/connection";
import {
  articlesViews, casesViews
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
      const existingView = await db.query.articlesViews.findFirst({
        where: and(
          eq(articlesViews.userId, userId),
          eq(articlesViews.articleId, articleId),
        )
      });

      if(existingView)
      {
        return;
      }

      await db.insert(articlesViews).values({ articleId, userId });
    }),
  addCaseView: protectedProcedure
    .input(addCaseViewSchema)
    .mutation(async ({ ctx: { userId }, input: { caseId } }) =>
    {
      const existingView = await db.query.casesViews.findFirst({
        where: and(
          eq(casesViews.userId, userId),
          eq(casesViews.caseId, caseId),
        )
      });

      if(existingView)
      {
        return;
      }
      
      await db.insert(casesViews).values({ caseId, userId });
    }),
  getArticleViews: protectedProcedure
    .input(getArticleViewsSchema)
    .query(async ({ input: { articleId } }) =>
    {
      const [result] = await db.select({ count: sql<number>`count(*)` }).from(articlesViews).where(eq(articlesViews.articleId, articleId));
      return result?.count ?? 0;
    }),
  getCaseViews: protectedProcedure
    .input(getCaseViewsSchema)
    .query(async ({ input: { caseId } }) =>
    {
      const [result] = await db.select({ count: sql<number>`count(*)` }).from(casesViews).where(eq(casesViews.caseId, caseId));
      return result?.count ?? 0;
    }),
});
