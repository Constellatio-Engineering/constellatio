import {
  and, desc, eq, inArray, lte, type SQL 
} from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { notifications } from "@constellatio/db/schema";
import { type GetNotificationsSchema } from "@constellatio/schemas/routers/notifications/getNotifications.schema";

import { getProfilePictureUrl } from "../utils/users";

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
  let limit: number | undefined;

  queryConditions.push(eq(notifications.recipientId, params.userId));

  if(params.getNotificationsType === "infinite")
  {
    const { cursor, notificationIds, pageSize } = params;

    if(notificationIds != null)
    {
      queryConditions.push(inArray(notifications.id, notificationIds));
    }

    if(cursor != null)
    {
      queryConditions.push(lte(notifications.index, cursor));
    }

    limit = pageSize + 1;
  }
  else
  {
    queryConditions.push(eq(notifications.id, params.notificationId));
  }

  const notificationsQueryResult = await db.query.notifications.findMany({
    limit,
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
              profilePictureSource: true,
              serverFilename: true,
              url: true,
              userId: true,
            },
          }
        }
      },
    },
  });

  const notificationsWithAdditionalData = notificationsQueryResult.map((notification) =>
  {
    const [senderProfilePicture] = notification.sender.profilePictures;
    let senderProfilePictureUrl = null;

    if(senderProfilePicture)
    {
      senderProfilePictureUrl = getProfilePictureUrl(senderProfilePicture);
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
