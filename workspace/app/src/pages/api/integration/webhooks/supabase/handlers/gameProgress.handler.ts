import { addBadgeForUser } from "@constellatio/api/services/badges.services";
import { type GameProgressSql } from "@constellatio/db/schema";

const getNumberOfCorrectAnsweredGames = (userId: string): number | null =>
{
  // TODO: Aus GameProgress Datenbank die Anzahl der korrekt beantworteten Games ziehen und const "correctAnsweredGames" ersetzen
  //  Dafür Einträge nach correct = true in column "GameResult" filtern.

  return 0;
};
const handleBadges = async (correctAnsweredGamesCount: number | null, userId: string) =>
{
  if(!correctAnsweredGamesCount)
  {
    return;
  }

  if(correctAnsweredGamesCount >= 3)
  {
    await addBadgeForUser({ badgeIdentifier: "game-master-3", userId });
  }
  if(correctAnsweredGamesCount >= 25)
  {
    await addBadgeForUser({ badgeIdentifier: "game-master-25", userId });
  }
  if(correctAnsweredGamesCount >= 50)
  {
    await addBadgeForUser({ badgeIdentifier: "game-master-50", userId });
  }
};
export const gameProgressHandlerGameProgressInsert = async (record: GameProgressSql["columns"]): Promise<void> =>
{
  const { UserId: userId } = record;

  const correctAnsweredGamesCount = getNumberOfCorrectAnsweredGames(userId);

  await handleBadges(correctAnsweredGamesCount, userId);
};
