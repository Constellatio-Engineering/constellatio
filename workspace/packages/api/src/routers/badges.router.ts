import { db } from "@constellatio/db/client";
import { badges, BadgeWithUserData, usersToBadges } from "@constellatio/db/schema";
import { markBadgeAsSeenSchema } from "@constellatio/schemas";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { and, asc, eq, ne, sql } from "@constellatio/db";

export const badgesRouter = createTRPCRouter({
  getBadges: protectedProcedure
    .query(async ({ ctx: { userId } }) =>
    {
      // TODO: Separate users progress on badges to a separate query and handle data merging on the client

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

      let badgesWithCompletedState: BadgeWithUserData[] = badgesQueryResult
        .map((badge) => ({
          description: badge.description,
          id: badge.id,
          identifier: badge.identifier,
          imageFilename: badge.imageFilename,
          isCompleted: badge.usersToBadges[0]?.hasCompletedBadge ?? false,
          name: badge.name,
          publicationState: badge.publicationState,
          wasSeen: badge.usersToBadges[0]?.userBadgeState === "seen",
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

      const hasOneOf100Badge = badgesWithCompletedState.some(badge => badge.identifier === "1-100" && badge.isCompleted);

      if(hasOneOf100Badge)
      {
        // if the user has completed the 1-100 badge, remove the 1-1000 badge from the list
        badgesWithCompletedState = badgesWithCompletedState.filter(badge => badge.identifier !== "1-1000");
      }
      else
      {
        // if the user has not completed the 1-100 badge, remove the 1-100 badge from the list (the 1-1000 badge is shown instead)
        badgesWithCompletedState = badgesWithCompletedState.filter(badge => badge.identifier !== "1-100");
      }

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
