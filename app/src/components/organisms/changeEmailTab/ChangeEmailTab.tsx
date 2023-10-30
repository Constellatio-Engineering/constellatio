import { Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { type FunctionComponent } from "react";

import * as styles from "../profileDetailsTab/ProfileDetailsTab.styles";

const ChangeEmailTab: FunctionComponent = () =>
{
  const isTabletScreen = useMediaQuery("(max-width: 1100px)");

  return (
    <div css={styles.wrapper}>
      {!isTabletScreen && <Title order={3}>E-Mail Adresse ändern</Title>}
    </div>
  );
};

export default ChangeEmailTab;
