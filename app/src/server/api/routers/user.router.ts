import { db } from "@/db/connection";
import {
  imageFileExtensions, imageFileMimeTypes, type ProfilePictureInsert, profilePictures, users 
} from "@/db/schema";
import { env } from "@/env.mjs";
import { findClickupTask } from "@/lib/clickup/tasks/find-task";
import { type ClickupTask } from "@/lib/clickup/types";
import { clickupCrmCustomField } from "@/lib/clickup/utils";
import { getCrmDataForUser, getUpdateUsersCrmDataPromises } from "@/pages/api/cron/sync-users-to-clickup";
import { updateUserDetailsSchema } from "@/schemas/auth/updateUserDetails.schema";
import { generateCreateSignedUploadUrlSchema } from "@/schemas/uploads/createSignedUploadUrl.schema";
import { setOnboardingResultSchema } from "@/schemas/users/setOnboardingResult.schema";
import { setProfilePictureSchema } from "@/schemas/users/setProfilePicture.schema";
import { getSignedCloudStorageUploadUrl } from "@/server/api/services/uploads.services";
import { getUserWithRelations } from "@/server/api/services/users.service";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { filterUserForClient } from "@/utils/filters";
import { InternalServerError } from "@/utils/serverError";

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
    }),
  updateUserDetails: protectedProcedure
    .input(updateUserDetailsSchema)
    .mutation(async ({ ctx: { supabaseServerClient, userId }, input }) =>
    {
      const [updatedUser] = await db.update(users).set(input).where(eq(users.id, userId)).returning();

      if(!updatedUser)
      {
        throw new InternalServerError(new Error("updatedUser was null after update. This should not happen and must be investigated."));
      }

      const userWithCrmData = await getCrmDataForUser(updatedUser, supabaseServerClient);

      if(!userWithCrmData)
      {
        console.error("userWithCrmData was null after getCrmDataForUser. This should not happen and must be investigated.");
        return;
      }

      const findCrmUserResult = await findClickupTask(env.CLICKUP_CRM_LIST_ID, {
        custom_field: {
          field_id: clickupCrmCustomField.userId.fieldId,
          operator: "=",
          value: updatedUser.id,
        },
      });

      const existingCrmUser = findCrmUserResult.data?.tasks[0] as ClickupTask | undefined;

      if(!existingCrmUser)
      {
        // Theoretically we could create the crm user here but this should never happen
        console.error("Existing CRM user not found for user with id ", updatedUser.id);
        return;
      }

      await Promise.allSettled(getUpdateUsersCrmDataPromises({ existingCrmUser, userWithCrmData }));
    })
});
