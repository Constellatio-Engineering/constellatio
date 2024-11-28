import { eq } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { type ProfilePictureInsert, profilePictures, users } from "@constellatio/db/schema";
import { updateUserDetailsSchema } from "@constellatio/schemas/routers/auth/updateUserDetails.schema";
import { generateCreateSignedUploadUrlSchema } from "@constellatio/schemas/routers/uploads/createSignedUploadUrl.schema";
import { setOnboardingResultSchema } from "@constellatio/schemas/routers/users/setOnboardingResult.schema";
import { setProfilePictureSchema } from "@constellatio/schemas/routers/users/setProfilePicture.schema";
import { imageFileExtensions, imageFileMimeTypes } from "@constellatio/shared/validation";

import { addUserToCrmUpdateQueue } from "../lib/clickup/utils";
import { stripe } from "../lib/stripe/stripe";
import { getSignedCloudStorageUploadUrl } from "../services/uploads.services";
import { getUserWithRelations } from "../services/users.service";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { filterUserForClient } from "../utils/filters";
import { NotFoundError, UnauthorizedError } from "../utils/serverError";

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
        profilePictureSource: "internal",
        serverFilename: file.serverFilename,
        userId,
      };

      await db.insert(profilePictures).values(profilePictureInsert).onConflictDoUpdate({
        set: {
          contentType: profilePictureInsert.contentType,
          fileExtension: profilePictureInsert.fileExtension,
          id: profilePictureInsert.id,
          profilePictureSource: "internal",
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
