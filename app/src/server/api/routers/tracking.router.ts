import { db } from "@/db/connection";
import { userPings } from "@/db/schema";
import { getClouStorageFileUrl } from "@/server/api/services/uploads.services";
import { getUserWithRelations } from "@/server/api/services/users.service";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { filterUserForClient } from "@/utils/filters";
import { NotFoundError } from "@/utils/serverError";

import { eq, and, asc } from "drizzle-orm";
import { z } from "zod";

export const trackingRouter = createTRPCRouter({
  ping: protectedProcedure
    .input(
      z.object({
        url: z.string().refine(
          (value) => {
            const isFullURL = /^https?:\/\//.test(value);
            const isRelativeURL = value.startsWith("/");
            return isFullURL || isRelativeURL;
          },
          {
            message: "Invalid URL format",
          }
        ),
      })
    )

    .mutation(async ({ ctx: { userId }, input: { url } }) => {
      console.log("ping", userId, url);

      const currentTime = Date.now();
      const timestampSchedul = currentTime - 1000 * 60;

      const sessionPing = await db
        .select()
        .from(userPings)
        .orderBy(asc(userPings.updatedAt))
        .where(and(eq(userPings.userId, userId), eq(userPings.url, url)))
        .limit(1);

      if (
        !sessionPing ||
        sessionPing.length === 0 ||
        !sessionPing[0]?.updatedAt
      ) {
        // Create a new entry
        db.insert(userPings).values({ userId: userId, url: url });
      } else {
        const sessionUpdatedAtTime = new Date(
          sessionPing[0].updatedAt
        ).getTime();

        const timeDifference = currentTime - sessionUpdatedAtTime;

        if (timeDifference > timestampSchedul) {
          // Create a new entry
          db.insert(userPings).values({ userId: userId, url: url });
        } else {
          // Update the updatedAt timestamp to the current date
          db.update(userPings)
            .set({ updatedAt: new Date() }) // Use new Date() to set the current date
            .where(eq(userPings.id, sessionPing[0].id));
        }
      }
    }),
});
