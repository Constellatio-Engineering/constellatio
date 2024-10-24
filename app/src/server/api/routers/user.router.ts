import { db } from "@/db/connection";
import {
  imageFileExtensions, imageFileMimeTypes, type ProfilePictureInsert, profilePictures, users 
} from "@/db/schema";
import { addUserToCrmUpdateQueue } from "@/lib/clickup/utils";
import { stripe } from "@/lib/stripe/stripe";
import { updateUserDetailsSchema } from "@/schemas/auth/updateUserDetails.schema";
import { generateCreateSignedUploadUrlSchema } from "@/schemas/uploads/createSignedUploadUrl.schema";
import { setOnboardingResultSchema } from "@/schemas/users/setOnboardingResult.schema";
import { setProfilePictureSchema } from "@/schemas/users/setProfilePicture.schema";
import { getSignedCloudStorageUploadUrl } from "@/server/api/services/uploads.services";
import { getUserWithRelations } from "@/server/api/services/users.service";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { filterUserForClient } from "@/utils/filters";
import { NotFoundError, UnauthorizedError } from "@/utils/serverError";

import { eq } from "drizzle-orm";

export const usersRouter = createTRPCRouter({
  createSignedProfilePictureUploadUrl: protectedProcedure
    .input(generateCreateSignedUploadUrlSchema(imageFileExtensions, imageFileMimeTypes))
    .mutation(async ({ ctx: { userId }, input: file }) =>
    {
      return getSignedCloudStorageUploadUrl({
        bucketType: "public",
        file,
        userId
      });
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
      try
      {
        const user = await getUserWithRelations(userId);
        return filterUserForClient(user);
      }
      catch (e: unknown)
      {
        if(e instanceof NotFoundError)
        {
          console.log("User not found - unauthorized");
          throw new UnauthorizedError();
        }
        throw e;
      }
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
    }),
  updateUserDetails: protectedProcedure
    .input(updateUserDetailsSchema)
    .mutation(async ({ ctx: { userId }, input }) =>
    {
      const [updatedUser] = await db.update(users).set(input).where(eq(users.id, userId)).returning();

      if(input.email != null && updatedUser?.stripeCustomerId != null)
      {
        await stripe.customers.update(updatedUser.stripeCustomerId, { email: input.email });
      }

      await addUserToCrmUpdateQueue(userId);
    })
});
