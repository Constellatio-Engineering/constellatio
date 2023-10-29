import { db } from "@/db/connection";
import {
  badges, type BadgeWithUserData, usersToBadges,
} from "@/db/schema";
import { markBadgeAsSeenSchema } from "@/schemas/badges/markBadgeAsSeen.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import {
  and, asc, eq, ne, sql 
} from "drizzle-orm";

export const badgesRouter = createTRPCRouter({
  getBadges: protectedProcedure
    .query(async ({ ctx: { userId } }) =>
    {
      const badgesQueryResult = await db.query.badges.findMany({
        orderBy: [asc(badges.name)],
        where: ne(badges.publicationState, "not-listed"),
        with: {
          usersToBadges: {
            extras: {
              hasCompletedBadge: (sql<boolean>`exists(select * from ${usersToBadges})`.as("has_completed_badge")),
            },
            where: eq(usersToBadges.userId, userId),
          }
        },
      });

      const badgesWithCompletedState: BadgeWithUserData[] = badgesQueryResult
        .map((badge) => ({
          description: badge.description,
          id: badge.id,
          imageFilename: badge.imageFilename,
          isCompleted: badge.usersToBadges[0]?.hasCompletedBadge ?? false,
          name: badge.name,
          publicationState: badge.publicationState,
          wasSeen: badge.usersToBadges[0]?.userBadgeState === "seen" ?? false,
        }))
        .sort((a, b) => 
        {
          if(a.publicationState === "published" && b.publicationState !== "published") 
          {
            return -1;
          }
          else if(a.publicationState !== "published" && b.publicationState === "published") 
          {
            return 1;
          }
          else 
          {
            return a.name.localeCompare(b.name);
          }
        });

      return ({
        badges: badgesWithCompletedState,
        completedCount: badgesWithCompletedState.filter((badge) => badge.isCompleted).length,
        totalCount: badgesWithCompletedState.length,
      });
    }),
  markBadgeAsSeen: protectedProcedure
    .input(markBadgeAsSeenSchema)
    .mutation(async ({ ctx: { userId }, input: { badgeId } }) =>
    {
      await db.update(usersToBadges).set({ userBadgeState: "seen" }).where(and(
        eq(usersToBadges.badgeId, badgeId),
        eq(usersToBadges.userId, userId),
      ));
    }),
});
