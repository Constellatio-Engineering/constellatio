import { Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileHistoryTab.styles";
import ProfileHistoryBlocks from "../profileHistoryBlocks/ProfileHistoryBlocks";

const ProfileHistoryTab: FunctionComponent = () => 
{
  const isTabletScreen = useMediaQuery("(max-width: 1100px)"); 
  return (
    <div style={{ width: "100%" }}>
      {!isTabletScreen && <Title order={3} css={styles.tabHeader}>Verlauf</Title>}
      <ProfileHistoryBlocks/>
    </div>
  );
};

export default ProfileHistoryTab;
