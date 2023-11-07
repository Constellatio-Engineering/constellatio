import { notifications } from "@mantine/notifications";
import { type NotificationProps } from "@mantine/notifications/lib/types";

export const showErrorNotification = (options: NotificationProps): void =>
{
  const title = options.title ?? "Da ist leider etwas schief gelaufen.";

  notifications.show({
    ...options,
    autoClose: false,
    color: "red",
    title,
  });
};
