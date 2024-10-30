import { BellIcon } from "@/components/Icons/Bell";
import { useAmountOfUnreadNotification } from "@/hooks/useAmountOfUnreadNotification";

import Link from "next/link";
import React, { type FunctionComponent } from "react";

import * as styles from "./NotificationsBell.styles";

import { appPaths } from "@/utils/paths";

const NotificationsBell: FunctionComponent = () =>
{
  const { data: amountOfUnreadNotifications } = useAmountOfUnreadNotification();
  const count = Math.min(amountOfUnreadNotifications?.count ?? 0, 99);

  return (
    <Link href={appPaths.notifications}>
      <div css={styles.wrapper}>
        {count > 0 && (
          <div css={styles.count}>{count}</div>
        )}
        <BellIcon size={26}/>
      </div>
    </Link>
  );
};

export default NotificationsBell;
