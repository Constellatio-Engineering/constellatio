import { addBadgeForUser } from "@constellatio/api/services/badges.services";
import { eq, countDistinct } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { correctAnswers, type CorrectAnswerSql, forumAnswers } from "@constellatio/db/schema";

const getCorrectAnswersAmount = async (userId: string): Promise<number> =>
{
  const [result] = await db
    .select({ count: countDistinct(correctAnswers.id) })
    .from(forumAnswers)
    .where(eq(forumAnswers.userId, userId))
    .innerJoin(correctAnswers, eq(forumAnswers.id, correctAnswers.answerId));

  return result?.count ?? 0;
};

export const forumAnswerActivityHandlerCorrectAnswerInsert = async (record: CorrectAnswerSql["columns"]): Promise<void> =>
{
  const { AnswerId: answerId } = record;

  const answer = await db.query.forumAnswers.findFirst({
    where: eq(forumAnswers.id, answerId),
  });

  if(!answer)
  {
    throw new Error(`Answer not found for answerId ${answerId}`);
  }

  const { userId } = answer;

  if(!userId)
  {
    return;
  }

  const correctAnswersAmount = await getCorrectAnswersAmount(userId);

  if(correctAnswersAmount >= 20)
  {
    await addBadgeForUser({ badgeIdentifier: "forum-profi", userId });
  }
};
