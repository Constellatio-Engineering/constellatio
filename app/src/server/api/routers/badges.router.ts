import { db } from "@/db/connection";
import {
  badges, users, usersToBadges,
} from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import {
  and, asc, eq, exists, sql 
} from "drizzle-orm";

export const badgesRouter = createTRPCRouter({
  getBadges: protectedProcedure
    .query(async ({ ctx: { userId } }) =>
    {
      const result = await db.query.badges.findMany({
        columns: {
          name: true,
        },
        orderBy: [asc(badges.name)],
        with: {
          usersToBadges: {
            extras: {
              hasCompletedBadge: (sql<boolean>`exists(select * from ${usersToBadges})`.as("has_completed_badge")),
            },
            where: eq(usersToBadges.userId, userId),
          }
        }
      });

      result.forEach((badge) =>
      {
        console.log("badge", {
          name: badge.name,
          usersToBadges: badge.usersToBadges
        });
      });

      return result;

      /* return db.query.badges.findMany({
        orderBy: [asc(badges.name)],
        with: {
          usersToBadges: {
            where: eq(usersToBadges.userId, userId),
            with: {
              user: {
                columns: {},
                extras: {
                  hasCompletedBadge: sql<boolean>`count(${users.id})`.as("has_completed_badge"),
                }
              }
            }
          }
        }
      });*/
    }),
});
