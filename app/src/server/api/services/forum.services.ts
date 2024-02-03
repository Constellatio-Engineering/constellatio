import { db } from "@/db/connection";
import { forumQuestions, questionUpvotes, users } from "@/db/schema";
import { type GetQuestionsSchema } from "@/schemas/forum/getQuestions.schema";

import {
  and, count, desc, eq, getTableColumns, lt, lte, or, type SQL, sql
} from "drizzle-orm";

type GetUpvotesForQuestion = (questionId: string) => Promise<number>;

// eslint-disable-next-line import/no-unused-modules
export const getUpvotesForQuestion: GetUpvotesForQuestion = async (questionId) =>
{
  const [result] = await db
    .select({ count: sql<number>`cast(count(*) as int)` })
    .from(questionUpvotes)
    .where(eq(questionUpvotes.questionId, questionId));

  return result?.count ?? 0;
};

type GetInfiniteQuestionsParams = GetQuestionsSchema & {
  getQuestionsType: "infinite";
  userId: string;
};

type GetQuestionByIdParams = {
  getQuestionsType: "byId";
  questionId: string;
  userId: string;
};

type GetQuestionsParams = GetInfiniteQuestionsParams | GetQuestionByIdParams;

export const getQuestions = async (params: GetQuestionsParams) => // eslint-disable-line @typescript-eslint/explicit-function-return-type
{
  const userUpvotesSubQuery = db
    .$with("UserUpvotes")
    .as(db
      .select({ questionId: questionUpvotes.questionId })
      .from(questionUpvotes)
      .where(eq(questionUpvotes.userId, params.userId))
    );

  const countUpvotesSubquery = db
    .with(userUpvotesSubQuery)
    .select({
      ...getTableColumns(forumQuestions),
      isUpvoted: sql<boolean>`case when ${userUpvotesSubQuery.questionId} is null then false else true end`.as("isUpvoted"),
      upvotesCount: count(questionUpvotes.questionId).as("upvotesCount"),
    })
    .from(forumQuestions)
    .leftJoin(userUpvotesSubQuery, eq(forumQuestions.id, userUpvotesSubQuery.questionId))
    .leftJoin(questionUpvotes, eq(forumQuestions.id, questionUpvotes.questionId))
    .where(params.getQuestionsType === "byId" ? eq(forumQuestions.id, params.questionId) : undefined)
    .groupBy(forumQuestions.id, userUpvotesSubQuery.questionId)
    .as("questionUpvotesSq");

  let queryConditions: SQL<unknown> | undefined;
  let orderBy: SQL | SQL[] = [];

  if(params.getQuestionsType === "infinite")
  {
    const { cursor } = params;

    switch (cursor.cursorType)
    {
      case "newest":
      {
        if(cursor.index != null)
        {
          queryConditions = lte(countUpvotesSubquery.index, cursor.index);
        }
        orderBy = desc(countUpvotesSubquery.index);
        break;
      }
      case "upvotes":
      {
        if(cursor.upvotes != null)
        {
          if(cursor.index == null)
          {
            queryConditions = lte(countUpvotesSubquery.upvotesCount, cursor.upvotes);
          }
          else
          {
            // If the upvotes count is the same, the newer question ranks higher
            queryConditions = or(
              lt(countUpvotesSubquery.upvotesCount, cursor.upvotes),
              and(
                eq(countUpvotesSubquery.upvotesCount, cursor.upvotes),
                lte(countUpvotesSubquery.index, cursor.index)
              )
            );
          }
        }

        orderBy = [desc(countUpvotesSubquery.upvotesCount), desc(countUpvotesSubquery.index)];
        break;
      }
    }
  }

  const questionsSortedWithAuthor = await db
    .with(countUpvotesSubquery)
    .select({
      author: {
        username: users.displayName,
      },
      createdAt: countUpvotesSubquery.createdAt,
      id: countUpvotesSubquery.id,
      index: countUpvotesSubquery.index,
      isUpvoted: countUpvotesSubquery.isUpvoted,
      legalArea: countUpvotesSubquery.legalArea,
      legalField: countUpvotesSubquery.legalField,
      legalTopic: countUpvotesSubquery.legalTopic,
      text: countUpvotesSubquery.text,
      title: countUpvotesSubquery.title,
      updatedAt: countUpvotesSubquery.updatedAt,
      upvotesCount: countUpvotesSubquery.upvotesCount,
    })
    .from(countUpvotesSubquery)
    .where(queryConditions)
    .innerJoin(users, eq(countUpvotesSubquery.userId, users.id))
    .orderBy(...(Array.isArray(orderBy) ? orderBy : [orderBy]))
    .limit(params.getQuestionsType === "byId" ? 1 : params.limit + 1);

  return questionsSortedWithAuthor;
};
