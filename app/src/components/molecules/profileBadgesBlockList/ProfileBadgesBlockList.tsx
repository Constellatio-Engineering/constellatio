import { Button } from "@/components/atoms/Button/Button";
import { ArrowDown } from "@/components/Icons/ArrowDown";
import { ArrowUp } from "@/components/Icons/ArrowUp";

import React, { Fragment, type FunctionComponent } from "react";

import * as styles from "./ProfileBadgesBlockList.styles";
import ProfileBadgeCard, { type ProfileBadgeCardProps } from "../profileBadgeCard/ProfileBadgeCard";

const ProfileBadgesBlockList: FunctionComponent = () => 
{
  const badges: ProfileBadgeCardProps[] = [
    { description: "You provided feedback to improve design or content", name: "badge1", size: "large" }, 
    {
      description: "You provided feedback to improve design or content", name: "badge2", selected: true, size: "large" 
    }
  ];
  const [showAll, setShowAll] = React.useState<boolean>(false);
  return (
    <div css={styles.wrapper}>
      {
        badges?.slice(0, showAll ? badges?.length : 9)?.map((badge, badgeIndex) => (
          <Fragment key={badgeIndex}>
            <ProfileBadgeCard {...badge}/>
          </Fragment>
        ))
      }
      {badges?.length > 9 && (
        <div css={styles.showAllArea}>
          {!showAll && <span css={styles.showAllGredient}/>}
          <Button<"button">
            css={styles.showAllButton}
            onClick={() => setShowAll(!showAll)}
            styleType="tertiary"
            type="button">{showAll ? <>Show less{" "}<ArrowUp/></> : <>Show all{" "}<ArrowDown/></>}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileBadgesBlockList;
