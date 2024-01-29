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

type GetQuestionsParams = GetQuestionsSchema & {
  // queryConditions?: SQLWrapper[];
  userId: string;
};

export const getQuestions = async ({
  cursor,
  limit,
  // queryConditions = [],
  userId
}: GetQuestionsParams) => // eslint-disable-line @typescript-eslint/explicit-function-return-type
{
  const countUpvotesSubquery = db
    .select({
      ...getTableColumns(forumQuestions),
      upvotesCount: count(questionUpvotes.questionId).as("upvotesCount"),
    })
    .from(forumQuestions)
    .leftJoin(questionUpvotes, eq(forumQuestions.id, questionUpvotes.questionId))
    .groupBy(forumQuestions.id)
    .as("questionUpvotesSq");

  let queryConditions: SQL<unknown> | undefined;
  let orderBy: SQL | SQL[];

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

  const questionsSortedWithAuthor = await db
    .with(countUpvotesSubquery)
    .select({
      author: {
        username: users.displayName,
      },
      createdAt: countUpvotesSubquery.createdAt,
      id: countUpvotesSubquery.id,
      index: countUpvotesSubquery.index,
      legalArea: countUpvotesSubquery.legalArea,
      legalField: countUpvotesSubquery.legalField,
      legalTopic: countUpvotesSubquery.legalTopic,
      questionText: countUpvotesSubquery.question,
      title: countUpvotesSubquery.title,
      updatedAt: countUpvotesSubquery.updatedAt,
      upvotesCount: countUpvotesSubquery.upvotesCount,
      // upvotesCount2: sql<number>`SUM(${countUpvotesSubquery.upvotesCount} + 10)`,
    })
    .from(countUpvotesSubquery)
    .where(queryConditions)
    .innerJoin(users, eq(countUpvotesSubquery.userId, users.id))
    .orderBy(...(Array.isArray(orderBy) ? orderBy : [orderBy]))
    .limit(limit + 1);

  return questionsSortedWithAuthor;
};
