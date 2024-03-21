import { db } from "@/db/connection";
import { notifications } from "@/db/schema";
import { type GetNotificationsSchema } from "@/schemas/notifications/getNotifications.schema";
import { getProfilePictureUrl } from "@/utils/users";

import {
  and, desc, eq, inArray, lte, type SQL 
} from "drizzle-orm";

type GetInfiniteNotificationsParams = GetNotificationsSchema & {
  getNotificationsType: "infinite";
  userId: string;
};

type GetNotificationByIdParams = {
  getNotificationsType: "byId";
  notificationId: string;
  userId: string;
};

type GetNotificationsParams = GetInfiniteNotificationsParams | GetNotificationByIdParams;

export const getNotifications = async (params: GetNotificationsParams) => // eslint-disable-line @typescript-eslint/explicit-function-return-type
{
  if(params.getNotificationsType === "infinite" && params.notificationIds && params.notificationIds.length === 0)
  {
    return [];
  }

  const queryConditions: SQL[] = [];

  queryConditions.push(eq(notifications.recipientId, params.userId));

  if(params.getNotificationsType === "infinite")
  {
    const { cursor, notificationIds } = params;

    if(notificationIds != null)
    {
      queryConditions.push(inArray(notifications.id, notificationIds));
    }

    if(cursor.index != null)
    {
      queryConditions.push(lte(notifications.index, cursor.index));
    }
  }
  else
  {
    queryConditions.push(eq(notifications.id, params.notificationId));
  }

  const notificationsQueryResult = await db.query.notifications.findMany({
    orderBy: [desc(notifications.createdAt)],
    where: and(...queryConditions),
    with: {
      notificationType: true,
      sender: {
        columns: {
          displayName: true,
          id: true,
        },
        with: {
          profilePictures: {
            columns: {
              serverFilename: true,
            },
          }
        }
      },
    },
  });

  const notificationsWithAdditionalData = notificationsQueryResult.map((notification) =>
  {
    const senderProfilePicture = notification.sender.profilePictures[0]?.serverFilename;
    let senderProfilePictureUrl = null;

    if(senderProfilePicture)
    {
      senderProfilePictureUrl = getProfilePictureUrl({
        serverFilename: senderProfilePicture,
        userId: notification.sender.id 
      });
    }

    return ({
      ...notification,
      sender: {
        ...notification.sender,
        profilePictureUrl: senderProfilePictureUrl,
      },
    });
  });

  return notificationsWithAdditionalData;
};
