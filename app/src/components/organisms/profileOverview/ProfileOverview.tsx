import { type IProfilePageProps } from "@/pages/profile";

import { Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileOverview.styles";
import ProfileBadgesBlock from "../profileBadgesBlock/ProfileBadgesBlock";
import ProfilePersonalSpaceBlock from "../profilePersonalSpaceBlock/ProfilePersonalSpaceBlock";
import ProgressCardSection from "../progressCardSection/ProgressCardSection";

const ProfileOverview: FunctionComponent<{readonly allMainCategory: IProfilePageProps["allMainCategory"]}> = ({ allMainCategory }) => 
{
  const isTabletScreen = useMediaQuery("(max-width: 1100px)"); 
  return (
    <div css={styles.wrapper}>
      {!isTabletScreen && <Title order={3} css={styles.title}>Übersicht</Title>}
      <ProfilePersonalSpaceBlock/>
      <ProgressCardSection mainCategories={allMainCategory}/>
      {/* <ProfileLearningTimeBlock/> */}
      <ProfileBadgesBlock/>
    </div>
  );
};

export default ProfileOverview;
