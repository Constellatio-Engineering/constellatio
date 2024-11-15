import { addBadgeForUser } from "@constellatio/api/services/badges.services";
import { type ForumAnswerSql, type ForumQuestionSql } from "@constellatio/db/schema";

const getNumberOfForumAnswers = (userId: string): number | null =>
{
  // TODO: Summe der Antworten zu userId aus ForumAnswer Datenbank ziehen

  return 0;
};

const getNumberOfForumQuestions = (userId: string): number | null =>
{
  // TODO: Summe der Antworten zu userId aus ForumAnswer Datenbank ziehen

  return 0;
};

const handleBadges = async (userId: string) =>
{
  const answersCount = getNumberOfForumAnswers(userId);
  const questionsCount = getNumberOfForumQuestions(userId);

  const forumActivityCount = (answersCount || 0) + (questionsCount || 0);

  if(!forumActivityCount)
  {
    return;
  }

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

export const forumActivityHandlerAnswerInsert = async (record: ForumAnswerSql["columns"]): Promise<void> =>
{
  const { UserId: userId } = record;

  await handleBadges(userId);
};

export const forumActivityHandlerQuestionInsert = async (record: ForumQuestionSql["columns"]): Promise<void> =>
{
  const { UserId: userId } = record;

  await handleBadges(userId);
};
