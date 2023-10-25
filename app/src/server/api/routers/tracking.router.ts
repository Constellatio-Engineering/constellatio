import { db } from "@/db/connection";
import {
  type ProfilePictureInsert,
  profilePictures,
  userPings,
  users,
} from "@/db/schema";
import { setOnboardingResultSchema } from "@/schemas/users/setOnboardingResult.schema";
import { setProfilePictureSchema } from "@/schemas/users/setProfilePicture.schema";
import { getClouStorageFileUrl } from "@/server/api/services/uploads.services";
import { getUserWithRelations } from "@/server/api/services/users.service";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { filterUserForClient } from "@/utils/filters";
import { NotFoundError } from "@/utils/serverError";

import {
  eq, gte, and, lt, sql 
} from "drizzle-orm";
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
    .input(
      z.object({
        url: z.string().url(),
      })
    )
    .mutation(async ({ ctx: { userId }, input: { url } }) => 
    {
      console.log("ping", userId, url);

      /* const timestamp60SecondsAgo = Date.now() - 1000 * 60;

      const isInSessionSchedul = await db
        .select()
        .from(userPings) //                              updatedAt in DB < (new Date(updatedAt).getTime() - timestamp60SecondsAgo)
        .where(
          and(
            eq(userPings.userId, userId),
            eq(userPings.url, dataToInsert.url),
            lt(new Date(userPings.updatedAt).getTime(), timestamp60SecondsAgo)
          )
        );*/
    }),
});
