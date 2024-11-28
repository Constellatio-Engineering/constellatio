import { addBadgeForUser } from "@constellatio/api/services/badges.services";
import { countDistinct, eq, unionAll } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { forumAnswers, forumQuestions } from "@constellatio/db/schema";

const getNumberOfForumQuestionsAndAnswers = async (userId: string): Promise<number> =>
{
  const questions = db
    .select({ forumItemId: forumQuestions.id })
    .from(forumQuestions)
    .where(eq(forumQuestions.userId, userId));

  const answers = db
    .select({ forumItemId: forumAnswers.id })
    .from(forumAnswers)
    .where(eq(forumAnswers.userId, userId));

  const unionAllSubquery = unionAll(questions, answers).as("union_all_questions_and_answers");

  const [result] = await db
    .select({ combinedCount: countDistinct(unionAllSubquery.forumItemId) })
    .from(unionAllSubquery);

  return result?.combinedCount ?? 0;
};

const handleBadges = async (forumActivityCount: number, userId: string) =>
{
  if(forumActivityCount >= 1)
  {
    await addBadgeForUser({ badgeIdentifier: "forum-1", userId });
  }
  if(forumActivityCount >= 5)
  {
    await addBadgeForUser({ badgeIdentifier: "forum-5", userId });
  }
  if(forumActivityCount >= 10)
  {
    await addBadgeForUser({ badgeIdentifier: "forum-10", userId });
  }
};

export const forumActivityHandler = async (userId: string): Promise<void> =>
{
  const forumActivityCount = await getNumberOfForumQuestionsAndAnswers(userId);
  await handleBadges(forumActivityCount, userId);
};
