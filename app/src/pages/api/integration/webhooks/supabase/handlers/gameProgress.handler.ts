import type { GameProgressSql } from "@/db/schema";
import { addBadgeForUser } from "@/server/api/services/badges.services";

const handleBadges = async (correctAnsweredGames: number | null, userId: string) =>
{
  if(!correctAnsweredGames)
  {
    return;
  }

  if(correctAnsweredGames >= 3)
  {
    await addBadgeForUser({ badgeIdentifier: "game-master-3", userId });
  }
  if(correctAnsweredGames >= 25)
  {
    await addBadgeForUser({ badgeIdentifier: "game-master-25", userId });
  }
  if(correctAnsweredGames >= 50)
  {
    await addBadgeForUser({ badgeIdentifier: "game-master-50", userId });
  }
};
export const gameProgressHandlerGameProgressInsert = async (record: GameProgressSql["columns"]): Promise<void> =>
{
  const { UserId: userId } = record;

  // TODO: Aus GameProgress Datenbank die Anzahl der korrekt beantworteten Games ziehen und const "correctAnsweredGames" ersetzen
  //  Dafür Einträge nach correct = true in column "GameResult" filtern.

  const correctAnsweredGames = 1;

  await handleBadges(correctAnsweredGames, userId);
};
