import { db } from "@/db/connection";
import {
  type ProfilePictureInsert, profilePictures, userPings, users
} from "@/db/schema";
import { setOnboardingResultSchema } from "@/schemas/users/setOnboardingResult.schema";
import { setProfilePictureSchema } from "@/schemas/users/setProfilePicture.schema";
import { getClouStorageFileUrl } from "@/server/api/services/uploads.services";
import { getUserWithRelations } from "@/server/api/services/users.service";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { filterUserForClient } from "@/utils/filters";
import { NotFoundError } from "@/utils/serverError";

import { eq, and, lt, sql } from "drizzle-orm";
import { z } from "zod";

export const trackingRouter = createTRPCRouter({
  /* trackPageEnter: publicProcedure
    .input(z.object({
      timestamp: z.number().int().nonnegative(),
      url: z.string().url(),
    }))
    .mutation(({ ctx: { session }, input: { timestamp, url } }) =>
    {

    })*/
  ping: protectedProcedure
    .input(z.object({
      url: z.string().url(),
    }))
    .mutation(({ ctx: { userId }, input: { url } }) =>
    {
      const timestamp60SecondsAgo = Date.now() - 1000 * 60;

      const existingPing = db.select().from(userPings).where(
        sql``
      );

      /* const existingPing = db.query.userPings.findFirst({
        where: and(
          eq(userPings.userId, userId),
          eq(userPings.url, url),
          lt(userPings.updatedAt, timestamp60SecondsAgo)
        )
      });*/
    })
});
