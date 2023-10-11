import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileHistoryTab.styles";
import { Title } from "@mantine/core";
import ProfileHistoryBlocks from "../profileHistoryBlocks/ProfileHistoryBlocks";

const ProfileHistoryTab: FunctionComponent = () => (
  <div style={{width:"100%"}}>
    <Title order={3} css={styles.tabHeader}>History</Title>
    <ProfileHistoryBlocks/>

  </div>
);

export default ProfileHistoryTab;
