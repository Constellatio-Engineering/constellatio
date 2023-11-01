import BadgesCarousel from "@/components/molecules/badgesCarousel/BadgesCarousel";
import ProfileBadgesBlockHead from "@/components/molecules/profileBadgesBlockHead/ProfileBadgesBlockHead";

import React, { type FunctionComponent } from "react";

import * as styles from "./BadgesCarouselBlock.styles";

const BadgesCarouselBlock: FunctionComponent = () =>
{
  return (
    <div css={styles.wrapper}>
      <ProfileBadgesBlockHead/>
      <BadgesCarousel/>
    </div>
  );
};

export default BadgesCarouselBlock;
