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
  getOnboardingResult: protectedProcedure
    .query(async ({ ctx: { userId } }) =>
    {
      const onboardingResult = await db
        .select({ onboardingResult: users.onboardingResult })
        .from(users)
        .where(eq(users.id, userId));

      return onboardingResult[0]?.onboardingResult ?? null;
    }),
  getSignedProfilePictureUrl: protectedProcedure
    .input(z.object({
      fileId: z.string(),
    }))
    .query(async ({ ctx: { userId }, input: { fileId } }) =>
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
    .mutation(async ({ ctx: { userId }, input: file }) =>
    {
      const profilePictureInsert: ProfilePictureInsert = {
        contentType: file.contentType,
        fileExtension: file.fileExtensionLowercase,
        id: file.id,
        serverFilename: file.serverFilename,
        userId,
      };

      await db.insert(profilePictures).values(profilePictureInsert).onConflictDoUpdate({
        set: {
          contentType: profilePictureInsert.contentType,
          fileExtension: profilePictureInsert.fileExtension,
          id: profilePictureInsert.id,
          serverFilename: profilePictureInsert.serverFilename,
        },
        target: profilePictures.userId,
      });
    })
});
