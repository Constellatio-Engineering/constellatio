import { Button } from "@/components/atoms/Button/Button";
import { ArrowDown } from "@/components/Icons/ArrowDown";
import { ArrowUp } from "@/components/Icons/ArrowUp";
import useBadges from "@/hooks/useBadges";

import React, { Fragment, type FunctionComponent } from "react";

import * as styles from "./ProfileBadgesBlockList.styles";
import ProfileBadgeCard from "../profileBadgeCard/ProfileBadgeCard";

const ProfileBadgesBlockList: FunctionComponent = () => 
{
  const { getBadgesResult: { badges } } = useBadges();
  const [showAll, setShowAll] = React.useState<boolean>(false);
  const badgesToShowWithoutShowAll = 9;

  return (
    <>
      <div css={styles.wrapper}>
        {badges.slice(0, showAll ? badges.length : badgesToShowWithoutShowAll)?.map((badge, badgeIndex) => (
          <Fragment key={badgeIndex}>
            <ProfileBadgeCard {...badge} size="small" shouldSmallVariantAdjustSizeToParent/>
          </Fragment>
        ))}
      </div>
      {badges.length > badgesToShowWithoutShowAll && (
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
    </>
  );
};

export default ProfileBadgesBlockList;
