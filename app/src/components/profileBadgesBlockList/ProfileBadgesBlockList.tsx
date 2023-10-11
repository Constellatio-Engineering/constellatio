import React, { Fragment, type FunctionComponent } from "react";

import * as styles from "./ProfileBadgesBlockList.styles";
import { Button } from "../atoms/Button/Button";
import { ArrowDown } from "../Icons/ArrowDown";
import { ArrowUp } from "../Icons/ArrowUp";
import ProfileBadgeCard from "../profileBadgeCard/ProfileBadgeCard";

const ProfileBadgesBlockList: FunctionComponent = () => 
{
  const badges = [
    { description: "You provided feedback to improve design or content", name: "badge1" }, 
    { description: "You provided feedback to improve design or content", name: "badge2" },
    { description: "You provided feedback to improve design or content", name: "badge2" },
    { description: "You provided feedback to improve design or content", name: "badge2" },
    { description: "You provided feedback to improve design or content", name: "badge2" },
    { description: "You provided feedback to improve design or content", name: "badge2" },
    { description: "You provided feedback to improve design or content", name: "badge2" },
    { description: "You provided feedback to improve design or content", name: "badge2" },
    { description: "You provided feedback to improve design or content", name: "badge2" },
    { description: "You provided feedback to improve design or content", name: "badge2" },
    { description: "You provided feedback to improve design or content", name: "badge2" },
    { description: "You provided feedback to improve design or content", name: "badge2" },
    { description: "You provided feedback to improve design or content", name: "badge2" },
    { description: "You provided feedback to improve design or content", name: "badge2" },
    { description: "You provided feedback to improve design or content", name: "badge3" }
  ];
  const [showAll, setShowAll] = React.useState<boolean>(false);
  return (
    <div css={styles.wrapper}>
      {
        badges?.slice(0, showAll ? badges?.length : 9)?.map((badge, badgeIndex) => (
          <Fragment key={badgeIndex}>
            <ProfileBadgeCard name={badge.name} description={badge.description}/>
          </Fragment>
        ))
      }
      <div css={styles.showAllArea}>
        {!showAll && <span css={styles.showAllGredient}/>}
        <Button<"button">
          css={styles.showAllButton}
          onClick={() => setShowAll(!showAll)}
          styleType="tertiary"
          type="button">{showAll ? <>Show less{" "}<ArrowUp/></> : <>Show all{" "}<ArrowDown/></>}
        </Button>
      </div>
    </div>
  );
};

export default ProfileBadgesBlockList;
