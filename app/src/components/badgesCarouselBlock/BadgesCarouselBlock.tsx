import React, { type FunctionComponent } from "react";

import * as styles from "./BadgesCarouselBlock.styles";
import BadgesCarousel from "../badgesCarousel/BadgesCarousel";
import ProfileBadgesBlockHead from "../molecules/profileBadgesBlockHead/ProfileBadgesBlockHead";

const BadgesCarouselBlock: FunctionComponent = () => (
  <div css={styles.wrapper}>
    <ProfileBadgesBlockHead/>
    <BadgesCarousel/>
  </div>
);

export default BadgesCarouselBlock;
