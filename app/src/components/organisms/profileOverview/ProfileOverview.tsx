import ProfileBadgesBlock from "@/components/profileBadgesBlock/ProfileBadgesBlock";
import { type IProfilePageProps } from "@/pages/profile";

import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileOverview.styles";
import ProfilePersonalSpaceBlock from "../profilePersonalSpaceBlock/ProfilePersonalSpaceBlock";
import ProgressCardSection from "../progressCardSection/ProgressCardSection";

const ProfileOverview: FunctionComponent<{readonly allMainCategory: IProfilePageProps["allMainCategory"]}> = ({ allMainCategory }) => (
  <div css={styles.wrapper}>
    <Title order={3} css={styles.title}>Overview</Title>
    <ProfilePersonalSpaceBlock/>
    <ProgressCardSection mainCategories={allMainCategory}/>
    <ProfileBadgesBlock/>
  </div>
);

export default ProfileOverview;
