import { addBadgeForUser } from "@constellatio/api/services/badges.services";
import { type CorrectAnswerSql } from "@constellatio/db/schema";

const hasGivenAtLeast20CorrectAnswers = (answerId: string): boolean | null =>
{
  // TODO: Boolean zurückgeben, ob Summe der Antworten zu userId aus CorrectAnswer Datenbank >= 20 ist

  return false;
};

const getUserIdFromAnswerId = (answerId: string): string | null =>
{
  return null;
};

export const forumAnswerActivityHandlerCorrectAnswerInsert = async (record: CorrectAnswerSql["columns"]): Promise<void> =>
{
  const { AnswerId: answerId } = record;

  const userId = getUserIdFromAnswerId(answerId);

  if(!userId)
  {
    return;
  }

  if(await hasGivenAtLeast20CorrectAnswers(answerId))
  {
    await addBadgeForUser({ badgeIdentifier: "forum-profi", userId });
  }
};
