import { getHasUserEarnedBadgeAlready } from "@/utils/badge";

import { addBadgeForUser } from "@constellatio/api/services/badges.services";
import { eq, gte } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { pings, type PingSql } from "@constellatio/db/schema";
import { getDateInLocalTimezone } from "@constellatio/utils/dates";

const has25HoursOfUsageTime = async (userId: string): Promise<boolean | null> =>
{
  // TODO: Aus Ping Datenbank die Summe aller PingInterval Einträge für die userId ermitteln
  //  und boolean zurückgeben, ob diese Zeit größer als 25 Stunden ist

  return false;
};

export const usageTimeHandlerPingInsert = async (record: PingSql["columns"]): Promise<void> =>
{
  const hasBadgeAlready = await getHasUserEarnedBadgeAlready(record.UserId, "dauerbrenner");

  if(!hasBadgeAlready)
  {
    return;
  }

  /* const usageTimePerDayLast3Days = await db
    .select()
    .from(pings)
    .where(eq(pings.userId, record.UserId))
    .where(gte(pings.createdAt, getDateInLocalTimezone(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), record.TimeZoneOffset)))
    .groupBy(sql<Date>`date_trunc('day', ${pings.createdAt})`)
    .orderBy(asc(sql<Date>`date_trunc('day', ${pings.createdAt})`))
    .limit(1);

  if(await has25HoursOfUsageTime(userId))
  {
    await addBadgeForUser({ badgeIdentifier: "disziplin", userId });
  }*/
};
