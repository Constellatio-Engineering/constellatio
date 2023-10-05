import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileOverview.styles";
import { Title } from "@mantine/core";
import ProfilePersonalSpaceBlock from "../profilePersonalSpaceBlock/ProfilePersonalSpaceBlock";

const ProfileOverview: FunctionComponent = () => (
  <div css={styles.wrapper}>
    <Title order={3} css={styles.title}>Overview</Title>
    <ProfilePersonalSpaceBlock/>
  </div>
);

export default ProfileOverview;
