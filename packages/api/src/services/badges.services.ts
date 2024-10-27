import { eq } from "@acme/db";
import { db } from "@acme/db/client";
import { badges, usersToBadges } from "@acme/db/schema";
import { BadgeIdentifier } from "@acme/shared-types";

import { addUserToCrmUpdateQueue } from "~/lib/clickup/utils";
import { InternalServerError } from "~/utils/serverError";

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
