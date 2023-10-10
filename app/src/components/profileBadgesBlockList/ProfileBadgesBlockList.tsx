import React, { Fragment, type FunctionComponent } from "react";

import * as styles from "./ProfileBadgesBlockList.styles";
import ProfileBadgeCard from "../profileBadgeCard/ProfileBadgeCard";

const ProfileBadgesBlockList: FunctionComponent = () => 
{
  const badges = [
    { description: "You provided feedback to improve design or content", name: "badge1" }, 
    { description: "You provided feedback to improve design or content", name: "badge2" },
    { description: "You provided feedback to improve design or content", name: "badge3" }
  ];
  return (
    <div css={styles.wrapper}>
      {
        badges?.map((badge, badgeIndex) => (
          <Fragment key={badgeIndex}>
            <ProfileBadgeCard name={badge.name} description={badge.description}/>
          </Fragment>
        ))
      }
    </div>
  );
};

export default ProfileBadgesBlockList;
