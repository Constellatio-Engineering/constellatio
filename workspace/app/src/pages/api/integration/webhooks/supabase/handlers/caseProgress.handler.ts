import { addBadgeForUser } from "@constellatio/api/services/badges.services";
import { type CaseProgressSql } from "@constellatio/db/schema";

const getNumberOfCompletedCases = (userId: string): number | null =>
{
  // TODO: Aus CaseProgress Datenbank die Anzahl der korrekt beantworteten Games ziehen
  //  Dafür Einträge nach completed in column "ProgressState" filtern.

  return 0;
};
const handleBadges = async (completedCasesCount: number | null, userId: string) =>
{
  if(!completedCasesCount)
  {
    return;
  }

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
export const caseProgressHandlerCaseProgressInsert = async (record: CaseProgressSql["columns"]): Promise<void> =>
{
  const { UserId: userId } = record;

  const completedCasesCount = getNumberOfCompletedCases(userId);

  await handleBadges(completedCasesCount, userId);
};
