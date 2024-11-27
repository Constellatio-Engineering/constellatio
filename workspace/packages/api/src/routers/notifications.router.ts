import { and, count, eq, isNull } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { notifications } from "@constellatio/db/schema";
import { getNotificationByIdSchema } from "@constellatio/schemas/routers/notifications/getNotificationById.schema";
import { getNotificationsSchema } from "@constellatio/schemas/routers/notifications/getNotifications.schema";
import { setNotificationReadStatusSchema } from "@constellatio/schemas/routers/notifications/setNotificationReadStatus.schema";
import { type inferProcedureOutput } from "@trpc/server";

import { getNotifications } from "../services/notifications.services";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { sleep } from "../utils/common";
import { InternalServerError } from "../utils/serverError";

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
    .query(async ({ ctx: { userId }, input: { cursor, notificationIds, pageSize } }) =>
    {
      await sleep(50);

      const notifications = await getNotifications({
        cursor,
        getNotificationsType: "infinite",
        notificationIds,
        pageSize,
        userId
      });

      const hasNextPage = notifications.length > pageSize;
      let nextCursor: number | null = null;

      if(hasNextPage)
      {
        // remove the last element since it's only used to determine if there's a next page
        const nextNotification = notifications.pop();

        if(nextNotification == null)
        {
          throw new InternalServerError(new Error("nextNotification is null"));
        }

        nextCursor = nextNotification.index;
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
