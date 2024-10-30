import { getNotifications } from "~/services/notifications.services";
import { InternalServerError } from "~/utils/serverError";

import { and, count, eq, isNull } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { notifications } from "@constellatio/db/schema";
import { getNotificationByIdSchema, type GetNotificationsSchema, getNotificationsSchema, setNotificationReadStatusSchema } from "@constellatio/schemas";
import { type inferProcedureOutput } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "../trpc";

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
