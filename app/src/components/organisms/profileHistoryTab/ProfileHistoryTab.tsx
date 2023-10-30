import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileHistoryTab.styles";
import ProfileHistoryBlocks from "../profileHistoryBlocks/ProfileHistoryBlocks";

const ProfileHistoryTab: FunctionComponent = () => 
{
  return (
    <div style={{ width: "100%" }}>
      <Title order={3} css={styles.tabHeader}>Verlauf</Title>
      <ProfileHistoryBlocks/>
    </div>
  );
};

export default ProfileHistoryTab;
