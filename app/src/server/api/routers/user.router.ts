import { db } from "@/db/connection";
import {
  type ProfilePictureInsert, profilePictures, users
} from "@/db/schema";
import { setOnboardingResultSchema } from "@/schemas/users/setOnboardingResult.schema";
import { setProfilePictureSchema } from "@/schemas/users/setProfilePicture.schema";
import { getClouStorageFileUrl } from "@/server/api/services/uploads.services";
import { getUserWithRelations } from "@/server/api/services/users.service";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { filterUserForClient } from "@/utils/filters";
import { NotFoundError } from "@/utils/serverError";

import { eq, and } from "drizzle-orm";
import { z } from "zod";

export const usersRouter = createTRPCRouter({
  createSignedProfilePictureUrl: protectedProcedure
    .input(z.object({
      fileId: z.string(),
    }))
    .mutation(async ({ ctx: { userId }, input: { fileId } }) =>
    {
      const file = await db.query.profilePictures.findFirst({
        where: and(
          eq(profilePictures.userId, userId),
          eq(profilePictures.id, fileId)
        )
      });

      if(!file)
      {
        throw new NotFoundError();
      }

      return getClouStorageFileUrl({ serverFilename: file.serverFilename, userId });
    }),
  getOnboardingResult: protectedProcedure
    .query(async ({ ctx: { userId } }) =>
    {
      const onboardingResult = await db
        .select({ onboardingResult: users.onboardingResult })
        .from(users)
        .where(eq(users.id, userId));

      return onboardingResult[0]?.onboardingResult ?? null;
    }),
  getUserDetails: protectedProcedure
    .query(async ({ ctx: { userId } }) =>
    {
      const user = await getUserWithRelations(userId);
      return filterUserForClient(user);
    }),
  setOnboardingResult: protectedProcedure
    .input(setOnboardingResultSchema)
    .mutation(async ({ ctx: { userId }, input: { result } }) =>
    {
      await db.update(users).set({ onboardingResult: result }).where(eq(users.id, userId));
    }),
  setProfilePicture: protectedProcedure
    .input(setProfilePictureSchema)
    .mutation(async ({ ctx: { userId }, input: { id, serverFilename } }) =>
    {
      const profilePictureInsert: ProfilePictureInsert = {
        id,
        serverFilename,
        userId
      };

      await db.insert(profilePictures).values(profilePictureInsert).onConflictDoUpdate({
        set: { id, serverFilename },
        target: profilePictures.userId,
      });
    })
});
