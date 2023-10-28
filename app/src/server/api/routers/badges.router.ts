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
      /* const subquery = db.select().from(usersToBadges).where(
        and(
          eq(usersToBadges.userId, userId),
        )
      ).as("subquery");

      const result = await db.select({
        description: badges.description,
        id: badges.id,
        imageFilename: badges.imageFilename,
        isCompleted: sql`select * from ${usersToBadges} where ${usersToBadges.badgeId} = ${badges.id} and ${usersToBadges.userId} = ${userId} limit 1`,
        // isCompleted2: exists(),
        name: badges.name
      }).from(badges).orderBy(asc(badges.name));

      console.log(result);*/

      const result = await db.query.badges.findMany({
        columns: {
          name: true,
        },
        orderBy: [asc(badges.name)],
        with: {
          usersToBadges: {
            where: eq(usersToBadges.userId, userId),
            with: {
              user: {
                columns: { email: true },
                extras: {
                  hasCompletedBadge: sql<boolean>`exists(select * from ${usersToBadges})`.as("has_completed_badge"),
                }
              }
            }
          }
        }
      });

      result.forEach((badge) =>
      {
        if(badge.usersToBadges.length > 0)
        {
          console.log("badge", badge.usersToBadges);
        }
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
