import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./NotificationsPageHeader.styles";
import OverviewHeader from "../OverviewHeader/OverviewHeader";

export const NotificationsPageHeader: FunctionComponent = () =>
{
  return (
    <div css={styles.wrapper}>
      <OverviewHeader variant="red"/>
      <div css={styles.contentContainer}>
        <Title css={styles.headerTitle} order={1}>
          Benachrichtigungen
        </Title>
      </div>
    </div>
  );
};
