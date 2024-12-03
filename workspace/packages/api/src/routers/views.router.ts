/* eslint-disable max-lines */
import { getAllMainCategories } from "@constellatio/cms/content/getAllMainCategories";
import { getArticleById } from "@constellatio/cms/content/getArticleById";
import { getCaseById } from "@constellatio/cms/content/getCaseById";
import {
  and, desc, eq, gt, inArray, lte, type SQL, sql, type SQLWrapper
} from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { contentViews, forumQuestions } from "@constellatio/db/schema";
import { env } from "@constellatio/env";
import { addContentItemViewSchema } from "@constellatio/schemas/routers/views/addContentItemView.schema";
import { getContentItemViewsSchema } from "@constellatio/schemas/routers/views/getContentItemViews.schema";
import { getLastViewedContentItemsSchema } from "@constellatio/schemas/routers/views/getLastViewedContentItems.schema";
import { getSeenArticlesSchema } from "@constellatio/schemas/routers/views/getSeenArticles.schema";
import { type ContentItemViewType } from "@constellatio/shared/validation";
import { type Nullable } from "@constellatio/utility-types";
import { type inferProcedureOutput } from "@trpc/server";
import postgres from "postgres";
import { z } from "zod";

import { addUserToCrmUpdateQueue } from "../lib/clickup/utils";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { InternalServerError } from "../utils/serverError";

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
                gt(contentViews.createdAt, rateLimitTimeframe)
              ))
              .for("update");  // Locking the row(s) to avoid race conditions

            if(recentViews.length > 0)
            {
              return;
            }

            const [lastViewedItem] = await trx
              .select({ itemId: contentViews.contentItemId })
              .from(contentViews)
              .where(eq(contentViews.userId, userId))
              .orderBy(desc(contentViews.createdAt))
              .limit(1);

            if(lastViewedItem && lastViewedItem.itemId === itemId)
            {
              // no duplicate consecutive inserts
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
        // eslint-disable-next-line import/no-named-as-default-member
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
  getSeenArticles: protectedProcedure
    .input(getSeenArticlesSchema)
    .query(async ({ ctx: { userId }, input }) =>
    {
      const queryConditions: SQLWrapper[] = [
        eq(contentViews.userId, userId),
        eq(contentViews.contentItemType, "article")
      ];

      if(input?.articleIds)
      {
        queryConditions.push(inArray(contentViews.contentItemId, input.articleIds));
      }

      const seenArticles = await db
        .select({ articleId: contentViews.contentItemId })
        .from(contentViews)
        .where(and(...queryConditions));

      return seenArticles.map(seenArticle => seenArticle.articleId);
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
        queryConditions.push(lte(contentViews.id, cursor));
      }

      const visitedItemsRaw = await db
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

      const hasNextPage = visitedItemsRaw.length > pageSize;
      let nextCursor: number | null = null;

      if(hasNextPage)
      {
        const nextItem = visitedItemsRaw.pop();

        if(nextItem == null)
        {
          throw new InternalServerError(new Error("nextItem is null"));
        }

        nextCursor = nextItem.id;
      }

      const visitedCases = [...new Set(visitedItemsRaw.filter(item => item.itemType === "case"))];
      const visitedArticles = [...new Set(visitedItemsRaw.filter(item => item.itemType === "article"))];
      const visitedForumQuestions = [...new Set(visitedItemsRaw.filter(item => item.itemType === "forumQuestion"))];

      const visitedCasesData = await Promise.all(visitedCases.map(async ({ itemId }) =>
      {
        const caseData = await getCaseById({ id: itemId });
        return caseData.legalCase;
      }).filter(Boolean));

      const visitedArticlesData = await Promise.all(visitedArticles.map(async ({ itemId }) =>
      {
        const articleData = await getArticleById({ id: itemId });
        return articleData.article;
      }).filter(Boolean));

      const visitedForumQuestionsData = await db.query.forumQuestions.findMany({
        where: inArray(forumQuestions.id, visitedForumQuestions.map(item => item.itemId)),
        with: { forumQuestionToLegalFields: true }
      });

      const allMainCategories = await getAllMainCategories();

      // const visitedItems = removeConsecutiveDuplicates(visitedItemsRaw, "itemId")
      const visitedItems = visitedItemsRaw
        .map(item =>
        {
          let visitedItemsData: {
            additionalInfo: Nullable<string>;
            id: number;
            itemId: string;
            itemType: ContentItemViewType; 
            title: string;
            viewedAt: Date;
          } | null = null;

          switch (item.itemType)
          {
            case "case":
            {
              const data = visitedCasesData.find(caseData => caseData?.id === item.itemId);

              if(data && data.title)
              {
                visitedItemsData = {
                  additionalInfo: data.legalArea?.legalAreaName,
                  id: item.id,
                  itemId: item.itemId,
                  itemType: item.itemType,
                  title: data.title,
                  viewedAt: item.viewedAt
                };
              }

              break;
            }
            case "article":
            {
              const data = visitedArticlesData.find(articleData => articleData?.id === item.itemId);

              if(data && data.title)
              {
                visitedItemsData = {
                  additionalInfo: data.legalArea?.legalAreaName,
                  id: item.id,
                  itemId: item.itemId,
                  itemType: item.itemType,
                  title: data.title,
                  viewedAt: item.viewedAt
                };
              }

              break;
            }
            case "forumQuestion":
            {
              const data = visitedForumQuestionsData.find(questionData => questionData.id === item.itemId);

              if(data)
              {
                visitedItemsData = {
                  additionalInfo: allMainCategories.find(mainCategory => mainCategory?.id === data.forumQuestionToLegalFields[0]?.legalFieldId)?.mainCategory,
                  id: item.id,
                  itemId: item.itemId,
                  itemType: item.itemType,
                  title: data.title,
                  viewedAt: item.viewedAt
                };
              }

              break;
            }
          }

          return visitedItemsData;
        })
        .filter(Boolean);

      return { nextCursor, visitedItems };
    }),
});

export type ViewsHistoryItems = inferProcedureOutput<typeof viewsRouter.getViewsHistory>["visitedItems"];
