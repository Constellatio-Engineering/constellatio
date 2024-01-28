import { db } from "@/db/connection";
import { forumQuestions, questionUpvotes, users } from "@/db/schema";
import { type GetQuestionsSchema } from "@/schemas/forum/getQuestions.schema";

import {
  and, asc,
  desc, eq, getTableColumns, gt, gte, isNotNull, lte, sql, type SQLWrapper
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
  const subquery = db
    .select({
      ...getTableColumns(forumQuestions),
      upvotesCount: sql<number>`cast(count(${questionUpvotes.questionId}) as int)`.as("upvotesCount"),
    })
    .from(forumQuestions)
    .leftJoin(questionUpvotes, eq(forumQuestions.id, questionUpvotes.questionId))
    .groupBy(forumQuestions.id)
    .as("questionUpvotesSq");

  const questionsSortedWithAuthor = await db
    .with(subquery)
    .select({
      author: {
        username: users.displayName,
      },
      createdAt: subquery.createdAt,
      legalArea: subquery.legalArea,
      legalField: subquery.legalField,
      legalTopic: subquery.legalTopic,
      questionId: subquery.id,
      questionText: subquery.question,
      questionTitle: subquery.title,
      updatedAt: subquery.updatedAt,
      upvotesCount: subquery.upvotesCount,
    })
    .from(subquery)
    .innerJoin(users, eq(subquery.userId, users.id))
    .orderBy(desc(subquery.upvotesCount))
    .limit(3);

  console.log("result", questionsSortedWithAuthor);

  /* console.log("test", test);

  switch (cursor.cursorType)
  {
    case "newest":
      queryConditions.push(lte(forumQuestions.index, cursor.cursorValue));
      break;
    case "upvotes":
      queryConditions.push(lte(forumQuestions.index, cursor.cursorValue));
      break;
  }

  const questionUpvotesSubQuery = db
    .$with("QuestionUpvotesSubQuery")
    .as(db
      .select({
        questionId: questionUpvotes.questionId,
      })
      .from(questionUpvotes)
    );

  const result = await db
    .with(questionUpvotesSubQuery)
    .select({
      ...getTableColumns(forumQuestions),
      author: {
        username: users.displayName
      },
      upvotesCount: sql<number>`cast(count(${questionUpvotes.questionId}) as int)`,
    })
    .from(forumQuestions)
    .orderBy(asc(forumQuestions.index))
    .limit(limit + 1)
    .where(and(...queryConditions))
    .innerJoin(users, eq(forumQuestions.userId, users.id))
    .leftJoin(userUpvotesSubQuery, eq(forumQuestions.id, userUpvotesSubQuery.questionId))
    .leftJoin(questionUpvotes, eq(forumQuestions.id, questionUpvotes.questionId))
    .groupBy(forumQuestions.id, userUpvotesSubQuery.questionId, users.id);*/

  return [];
};
