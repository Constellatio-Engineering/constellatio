import { Title } from "@mantine/core";
import { type FunctionComponent } from "react";

import * as styles from "./ProfileOverview.styles";
import ProfileBadgesBlock from "../profileBadgesBlock/ProfileBadgesBlock";
import ProfilePersonalSpaceBlock from "../profilePersonalSpaceBlock/ProfilePersonalSpaceBlock";
import ProgressCardSection from "../progressCardSection/ProgressCardSection";

const ProfileOverview: FunctionComponent = () =>
{
  return (
    <div css={styles.wrapper}>
      <Title order={3} css={styles.title}>Übersicht</Title>
      <ProfilePersonalSpaceBlock/>
      <ProgressCardSection/>
      {/* <ProfileLearningTimeBlock/> */}
      <ProfileBadgesBlock/>
    </div>
  );
};

export default ProfileOverview;
