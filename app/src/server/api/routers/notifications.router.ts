import { db } from "@/db/connection";
import { forumQuestions, notifications, } from "@/db/schema";
import { getNotificationByIdSchema } from "@/schemas/notifications/getNotificationById.schema";
import { type GetNotificationsSchema, getNotificationsSchema } from "@/schemas/notifications/getNotifications.schema";
import { markNotificationAsSeenSchema } from "@/schemas/notifications/markNotificationAsSeen.schema";
import { getNotifications } from "@/server/api/services/notifications.services";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { InternalServerError } from "@/utils/serverError";

import { type inferProcedureOutput } from "@trpc/server";
import { and, count, eq, isNull } from "drizzle-orm";

export const notificationsRouter = createTRPCRouter({
  getAmountOfUnreadNotifications: protectedProcedure
    .query(async () =>
    {
      const [amountQuery] = await db
        .select({ count: count() })
        .from(notifications)
        .where(isNull(notifications.readAt));

      return { count: amountQuery?.count };
    }),
  getNotificationById: protectedProcedure
    .input(getNotificationByIdSchema)
    .query(async ({ ctx: { userId }, input: { notificationId } }) =>
    {
      const [notification] = await getNotifications({
        getNotificationsType: "byId",
        notificationId,
        userId
      });

      return notification ?? null;
    }),
  getNotifications: protectedProcedure
    .input(getNotificationsSchema)
    .query(async ({ ctx: { userId }, input: { cursor, limit, notificationIds } }) =>
    {
      const notifications = await getNotifications({
        cursor,
        getNotificationsType: "infinite",
        limit,
        notificationIds,
        userId
      });

      const hasNextPage = notifications.length > limit;
      let nextCursor: GetNotificationsSchema["cursor"] | null = null;

      if(hasNextPage)
      {
        // remove the last element since it's only used to determine if there's a next page
        const nextNotification = notifications.pop();

        if(nextNotification == null)
        {
          throw new InternalServerError(new Error("nextNotification is null"));
        }

        nextCursor = {
          index: nextNotification.index
        };
      }

      return { nextCursor, notifications };
    }),
  markNotificationAsSeen: protectedProcedure
    .input(markNotificationAsSeenSchema)
    .mutation(async ({ ctx: { userId }, input: { notificationId } }) =>
    {
      await db.update(notifications).set({ readAt: new Date() }).where(and(
        eq(notifications.id, notificationId),
        eq(notifications.recipientId, userId),
      ));
    }),
});

export type NotificationsWithRelations = inferProcedureOutput<typeof notificationsRouter.getNotifications>["notifications"];
export type NotificationWithRelations = NotificationsWithRelations[number];
