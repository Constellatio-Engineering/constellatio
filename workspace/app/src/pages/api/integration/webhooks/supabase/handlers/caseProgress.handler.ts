import { addBadgeForUser } from "@constellatio/api/services/badges.services";
import { and, countDistinct, eq } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { type CaseProgressSql, casesProgress } from "@constellatio/db/schema";

const getNumberOfCompletedCases = async (userId: string): Promise<number> =>
{
  const [completedCases] = await db
    .select({ count: countDistinct(casesProgress.caseId) })
    .from(casesProgress)
    .where(and(
      eq(casesProgress.userId, userId),
      eq(casesProgress.progressState, "completed")
    ));

  return completedCases?.count ?? 0;
};

const handleBadges = async (completedCasesCount: number, userId: string) =>
{
  console.log("completedCasesCount", completedCasesCount);

  if(completedCasesCount >= 1)
  {
    await addBadgeForUser({ badgeIdentifier: "fall-1", userId });
  }
  if(completedCasesCount >= 5)
  {
    await addBadgeForUser({ badgeIdentifier: "fall-5", userId });
  }
  if(completedCasesCount >= 10)
  {
    await addBadgeForUser({ badgeIdentifier: "fall-10", userId });
  }
  if(completedCasesCount >= 25)
  {
    await addBadgeForUser({ badgeIdentifier: "fall-25", userId });
  }
};

export const caseProgressHandler = async (record: CaseProgressSql["columns"]): Promise<void> =>
{
  const { UserId: userId } = record;

  const completedCasesCount = await getNumberOfCompletedCases(userId);

  await handleBadges(completedCasesCount, userId);
};
