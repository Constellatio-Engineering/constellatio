import { type IProfilePageProps } from "@/pages/profile";

import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileOverview.styles";
import ProfileBadgesBlock from "../profileBadgesBlock/ProfileBadgesBlock";
import ProfilePersonalSpaceBlock from "../profilePersonalSpaceBlock/ProfilePersonalSpaceBlock";
import ProgressCardSection from "../progressCardSection/ProgressCardSection";
import ProfileLearningTimeBlock from "@/components/profileLearningTimeBlock/ProfileLearningTimeBlock";

const ProfileOverview: FunctionComponent<{readonly allMainCategory: IProfilePageProps["allMainCategory"]}> = ({ allMainCategory }) => (
  <div css={styles.wrapper}>
    <Title order={3} css={styles.title}>Overview</Title>
    <ProfilePersonalSpaceBlock/>
    <ProgressCardSection mainCategories={allMainCategory}/>
    <ProfileLearningTimeBlock/>
    <ProfileBadgesBlock/>
  </div>
);

export default ProfileOverview;
