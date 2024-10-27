import { eq } from "@acme/db";
import { db } from "@acme/db/client";
import { ProfilePictureInsert, profilePictures, users } from "@acme/db/schema";
import { generateCreateSignedUploadUrlSchema, setOnboardingResultSchema, setProfilePictureSchema, updateUserDetailsSchema } from "@acme/schemas";
import { imageFileExtensions, imageFileMimeTypes } from "@acme/shared-types";
import { filterUserForClient } from "@acme/utils";
import { addUserToCrmUpdateQueue } from "~/lib/clickup/utils";
import { stripe } from "~/lib/stripe/stripe";
import { getSignedCloudStorageUploadUrl } from "~/services/uploads.services";
import { getUserWithRelations } from "~/services/users.service";
import { NotFoundError, UnauthorizedError } from "~/utils/serverError";
import { createTRPCRouter, protectedProcedure } from "../trpc";

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
