import { db } from "@/db/connection";
import { questionUpvotes } from "@/db/schema";

import { eq, sql } from "drizzle-orm";

type GetUpvotesForQuestion = (questionId: string) => Promise<number>;

export const getUpvotesForQuestion: GetUpvotesForQuestion = async (questionId) =>
{
  const [result] = await db
    .select({ count: sql<number>`count(*)` })
    .from(questionUpvotes)
    .where(eq(questionUpvotes.questionId, questionId));

  return result?.count ?? 0;
};
