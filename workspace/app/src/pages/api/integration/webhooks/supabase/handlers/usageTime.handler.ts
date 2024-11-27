import { getHasUserEarnedBadgeAlready } from "@/utils/badge";

import { addBadgeForUser } from "@constellatio/api/services/badges.services";
import { eq, sum } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { pings, type PingSql } from "@constellatio/db/schema";

export const usageTimeHandlerPingInsert = async (record: PingSql["columns"]): Promise<void> =>
{
  const hasBadgeAlready = await getHasUserEarnedBadgeAlready(record.UserId, "disziplin");

  if(hasBadgeAlready)
  {
    return;
  }

  const [getTotalUsageTimeInSecondsResult] = await db
    .select({ value: sum(pings.pingInterval) })
    .from(pings)
    .where(eq(pings.userId, record.UserId));

  const totalUsageTimeInHours = (Number(getTotalUsageTimeInSecondsResult?.value) || 0) / 3600;

  if(totalUsageTimeInHours >= 25)
  {
    await addBadgeForUser({ badgeIdentifier: "disziplin", userId: record.UserId });
  }

  return;
};
