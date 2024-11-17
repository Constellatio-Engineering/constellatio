import { addBadgeForUser } from "@constellatio/api/services/badges.services";
import { and, countDistinct, eq } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { type GameProgressSql, gamesProgress } from "@constellatio/db/schema";

const getNumberOfCorrectAnsweredGames = async (userId: string): Promise<number> =>
{
  const [correctAnsweredGames] = await db
    .select({ count: countDistinct(gamesProgress.gameId) })
    .from(gamesProgress)
    .where(and(
      eq(gamesProgress.userId, userId),
      eq(gamesProgress.wasSolvedCorrectly, true)
    ));

  return correctAnsweredGames?.count ?? 0;
};

const handleBadges = async (correctAnsweredGamesCount: number, userId: string) =>
{
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

  const correctAnsweredGamesCount = await getNumberOfCorrectAnsweredGames(userId);

  await handleBadges(correctAnsweredGamesCount, userId);
};
