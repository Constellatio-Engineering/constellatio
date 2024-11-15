import { and, eq, sql } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { usersToBadges, badges } from "@constellatio/db/schema";
import { type BadgeIdentifier } from "@constellatio/shared/validation";

export const getHasUserEarnedBadgeAlready = async (userId: string, badgeIdentifier: BadgeIdentifier): Promise<boolean> =>
{
  const [hasBadge1] = await db
    .select({ exists: sql<boolean>`1` })
    .from(usersToBadges)
    .innerJoin(badges, eq(badges.id, usersToBadges.badgeId))
    .where(
      and(
        eq(usersToBadges.userId, userId),
        eq(badges.identifier, badgeIdentifier),
      )
    )
    .limit(1);

  const existingBadge = await db
    .select()
    .from(usersToBadges)
    .innerJoin(badges, eq(badges.id, usersToBadges.badgeId))
    .where(
      and(
        eq(usersToBadges.userId, userId),
        eq(badges.identifier, badgeIdentifier),
      )
    )
    .limit(1);

  console.log("hasBadge1", hasBadge1);
  console.log("hasBadge2", existingBadge);

  return hasBadge1?.exists ?? false;
};
