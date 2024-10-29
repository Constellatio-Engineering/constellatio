import { deleteClickupTask } from "~/lib/clickup/tasks/delete-task";
import { findClickupTask } from "~/lib/clickup/tasks/find-task";
import { type ClickupTask } from "~/lib/clickup/types";
import { clickupCrmCustomField, getClickupCrmUserByUserId } from "~/lib/clickup/utils";
import { NotFoundError, SelfDeletionRequestError } from "~/utils/serverError";

import { eq, or, type SQL } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import {
  answerUpvotes, bookmarks, casesProgress, casesSolutions,
  contentViews, documents, forumAnswers, forumQuestions, gamesProgress, notes, notifications,
  pings, profilePictures,
  questionUpvotes,
  referralBalances,
  referralCodes,
  referrals,
  streak,
  streakActivities,
  updateUserInCrmQueue, uploadedFiles, uploadFolders,
  users, usersToBadges, usersToRoles
} from "@constellatio/db/schema";
import { env } from "@constellatio/env"; 
import { deleteUserSchema } from "@constellatio/schemas";
import { printAllSettledPromisesSummary } from "@constellatio/utils";

import { adminProcedure, createTRPCRouter } from "../trpc";

export const adminRouter = createTRPCRouter({
  deleteUser: adminProcedure
    .input(deleteUserSchema)
    .mutation(async ({ ctx, input: { userEmail, userId } }) =>
    {
      const queryConditions: SQL[] = [];

      if(userId != null)
      {
        queryConditions.push(eq(users.id, userId));
      }
      else
      {
        queryConditions.push(eq(users.email, userEmail));
      }

      const userToDelete = await db.query.users.findFirst({
        where: or(...queryConditions)
      });

      if(!userToDelete)
      {
        throw new NotFoundError();
      }

      if(userToDelete.id === ctx.adminUserId)
      {
        throw new SelfDeletionRequestError();
      }

      await db.transaction(async transaction =>
      {
        await transaction.delete(contentViews).where(eq(contentViews.userId, userToDelete.id));
        await transaction.delete(streakActivities).where(eq(streakActivities.userId, userToDelete.id));
        await transaction.delete(streak).where(eq(streak.userId, userToDelete.id));
        await transaction.delete(updateUserInCrmQueue).where(eq(updateUserInCrmQueue.userId, userToDelete.id));
        await transaction.delete(referralBalances).where(eq(referralBalances.userId, userToDelete.id));
        await transaction.delete(referrals).where(or(
          eq(referrals.referringUserId, userToDelete.id),
          eq(referrals.referredUserId, userToDelete.id)
        ));
        await transaction.delete(referralCodes).where(eq(referralCodes.userId, userToDelete.id));
        await transaction.delete(pings).where(eq(pings.userId, userToDelete.id));
        await transaction.delete(notifications).where(or(
          eq(notifications.senderId, userToDelete.id),
          eq(notifications.recipientId, userToDelete.id)
        ));
        await transaction.delete(usersToRoles).where(eq(usersToRoles.userId, userToDelete.id));
        await transaction.delete(answerUpvotes).where(eq(answerUpvotes.userId, userToDelete.id));
        await transaction.delete(questionUpvotes).where(eq(questionUpvotes.userId, userToDelete.id));
        await transaction.delete(forumAnswers).where(eq(forumAnswers.userId, userToDelete.id));
        await transaction.delete(forumQuestions).where(eq(forumQuestions.userId, userToDelete.id));
        await transaction.delete(usersToBadges).where(eq(usersToBadges.userId, userToDelete.id));
        await transaction.delete(gamesProgress).where(eq(gamesProgress.userId, userToDelete.id));
        await transaction.delete(casesSolutions).where(eq(casesSolutions.userId, userToDelete.id));
        await transaction.delete(casesProgress).where(eq(casesProgress.userId, userToDelete.id));
        await transaction.delete(notes).where(eq(notes.userId, userToDelete.id));
        await transaction.delete(documents).where(eq(documents.userId, userToDelete.id));
        await transaction.delete(uploadedFiles).where(eq(uploadedFiles.userId, userToDelete.id));
        await transaction.delete(uploadFolders).where(eq(uploadFolders.userId, userToDelete.id));
        await transaction.delete(bookmarks).where(eq(bookmarks.userId, userToDelete.id));
        await transaction.delete(profilePictures).where(eq(profilePictures.userId, userToDelete.id));
        await transaction.delete(users).where(eq(users.id, userToDelete.id));
        await ctx.supabaseServerClient.auth.admin.deleteUser(userToDelete.id);
      });

      if(env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === "production")
      {
        let clickupTasks: ClickupTask[];

        if(userEmail)
        {
          clickupTasks = await findClickupTask(env.CLICKUP_CRM_LIST_ID, {
            custom_fields: [{
              field_id: clickupCrmCustomField.email.fieldId,
              operator: "=",
              value: userEmail
            }],
            include_closed: true,
          });
        }
        else
        {
          clickupTasks = await getClickupCrmUserByUserId(userId);
        }

        console.log(`found ${clickupTasks.length} clickup tasks for user ${userToDelete.email}`, clickupTasks.map(task => task.id));
        
        const results = await Promise.allSettled(clickupTasks.map(async task => deleteClickupTask(task.id)));

        printAllSettledPromisesSummary(results, "delete clickup tasks");
      }

      console.info(`Benutzer '${userToDelete.displayName}' mit E-Mail '${userToDelete.email}' erfolgreich gelöscht`);
    }),
});
