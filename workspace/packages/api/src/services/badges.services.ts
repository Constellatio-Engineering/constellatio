import { addUserToCrmUpdateQueue } from "~/lib/clickup/utils";
import { InternalServerError } from "~/utils/serverError";

import { eq } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { badges, usersToBadges } from "@constellatio/db/schema";
import { type BadgeIdentifier } from "@constellatio/shared/validation";

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
  await addUserToCrmUpdateQueue(userId);
};
