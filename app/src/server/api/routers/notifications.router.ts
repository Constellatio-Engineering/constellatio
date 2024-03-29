import { db } from "@/db/connection";
import { notifications, } from "@/db/schema";
import { getNotificationByIdSchema } from "@/schemas/notifications/getNotificationById.schema";
import { type GetNotificationsSchema, getNotificationsSchema } from "@/schemas/notifications/getNotifications.schema";
import { setNotificationReadStatusSchema } from "@/schemas/notifications/setNotificationReadStatus.schema";
import { getNotifications } from "@/server/api/services/notifications.services";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { InternalServerError } from "@/utils/serverError";

import { type inferProcedureOutput } from "@trpc/server";
import { and, count, eq, isNull } from "drizzle-orm";

export const notificationsRouter = createTRPCRouter({
  getAmountOfUnreadNotifications: protectedProcedure
    .query(async ({ ctx: { userId } }) =>
    {
      const [amountQuery] = await db
        .select({ count: count() })
        .from(notifications)
        .where(and(
          isNull(notifications.readAt),
          eq(notifications.recipientId, userId)
        ));

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
  setNotificationReadStatus: protectedProcedure
    .input(setNotificationReadStatusSchema)
    .mutation(async ({ ctx: { userId }, input: { newStatus, notificationId } }) =>
    {
      await db
        .update(notifications)
        .set({ readAt: newStatus === "read" ? new Date() : null })
        .where(and(
          eq(notifications.id, notificationId),
          eq(notifications.recipientId, userId),
        ));
    }),
});

type NotificationsWithRelations = inferProcedureOutput<typeof notificationsRouter.getNotifications>["notifications"];
export type NotificationWithRelations = NotificationsWithRelations[number];
