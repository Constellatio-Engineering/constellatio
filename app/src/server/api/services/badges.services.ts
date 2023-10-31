import { db } from "@/db/connection";
import { type BadgeIdentifier, badges, usersToBadges } from "@/db/schema";
import { InternalServerError } from "@/utils/serverError";

import { eq } from "drizzle-orm";

type AddBadgeForUser = (params: {
  badgeIdentifier: BadgeIdentifier;
  userId: string;
}) => Promise<void>;

export const addBadgeForUser: AddBadgeForUser = async ({ badgeIdentifier, userId }) =>
{
  const badge = await db.query.badges.findFirst({
    where: eq(badges.identifier, badgeIdentifier),
  });

  if(!badge)
  {
    throw new InternalServerError(new Error(`Badge with identifier ${badgeIdentifier} does not exist`));
  }

  await db.insert(usersToBadges).values({ badgeId: badge.id, userId, }).onConflictDoNothing();
};
