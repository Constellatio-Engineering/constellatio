import { db } from "@/db/connection";
import { forumQuestions, questionUpvotes, users } from "@/db/schema";
import { type GetQuestionsSchema } from "@/schemas/forum/getQuestions.schema";

import {
  and, desc, eq, getTableColumns, lte, type SQL, sql, type SQLWrapper 
} from "drizzle-orm";

type GetUpvotesForQuestion = (questionId: string) => Promise<number>;

// eslint-disable-next-line import/no-unused-modules
export const getUpvotesForQuestion: GetUpvotesForQuestion = async (questionId) =>
{
  const [result] = await db
    .select({ count: sql<number>`count(*)` })
    .from(questionUpvotes)
    .where(eq(questionUpvotes.questionId, questionId));

  return result?.count ?? 0;
};

type GetQuestionsParams = GetQuestionsSchema & {
  queryConditions?: SQLWrapper[];
  userId: string;
};

export const getQuestions = async ({
  cursor,
  limit,
  queryConditions = [],
  userId
}: GetQuestionsParams) => // eslint-disable-line @typescript-eslint/explicit-function-return-type
{
  const countUpvotesSubquery = db
    .select({
      ...getTableColumns(forumQuestions),
      upvotesCount: sql<number>`cast(count(${questionUpvotes.questionId}) as int)`.as("upvotesCount"),
    })
    .from(forumQuestions)
    .leftJoin(questionUpvotes, eq(forumQuestions.id, questionUpvotes.questionId))
    .groupBy(forumQuestions.id)
    .as("questionUpvotesSq");

  let orderBy: SQL | SQL[];

  switch (cursor.cursorType)
  {
    case "newest":
    {
      if(cursor.index != null)
      {
        queryConditions.push(lte(countUpvotesSubquery.index, cursor.index));
      }
      orderBy = desc(countUpvotesSubquery.index);
      break;
    }
    case "upvotes":
    {
      if(cursor.upvotes != null)
      {
        queryConditions.push(lte(countUpvotesSubquery.upvotesCount, cursor.upvotes));
      }
      if(cursor.index != null)
      {
        queryConditions.push(lte(countUpvotesSubquery.index, cursor.index));
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
    })
    .from(countUpvotesSubquery)
    .where(and(...queryConditions))
    .innerJoin(users, eq(countUpvotesSubquery.userId, users.id))
    .orderBy(...(Array.isArray(orderBy) ? orderBy : [orderBy]))
    .limit(limit + 1);

  console.log("questionsSortedWithAuthor", questionsSortedWithAuthor);

  return questionsSortedWithAuthor;
};
