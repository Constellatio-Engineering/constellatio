import { db } from "@/db/connection";
import { forumQuestions, questionUpvotes } from "@/db/schema";

import {
  and,
  desc, eq, getTableColumns, sql, type SQLWrapper
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getQuestions = async (userId: string, queryConditions: SQLWrapper[] = []) =>
{
  const userUpvotesSubQuery = db
    .$with("UserUpvotes")
    .as(
      db
        .select({
          questionId: questionUpvotes.questionId
        })
        .from(questionUpvotes)
        .where(eq(questionUpvotes.userId, userId))
    );

  const result = await db
    .with(userUpvotesSubQuery)
    .select({
      ...getTableColumns(forumQuestions),
      isUpvoted: sql<boolean>`case when ${userUpvotesSubQuery.questionId} is null then false else true end`,
      upvotesCount: sql<number>`cast(count(${questionUpvotes.questionId}) as int)`
    })
    .from(forumQuestions)
    .where(and(...queryConditions))
    .orderBy(desc(forumQuestions.createdAt))
    .leftJoin(userUpvotesSubQuery, eq(forumQuestions.id, userUpvotesSubQuery.questionId))
    .leftJoin(questionUpvotes, eq(forumQuestions.id, questionUpvotes.questionId))
    .groupBy(forumQuestions.id, userUpvotesSubQuery.questionId);

  return result;
};
