import CaisyImg from "@/basic-components/CaisyImg";

import { useMantineTheme } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileBadgeCard.styles";
import FlagImg from "../../../public/images/placeholder-flag.png";
import { BodyText } from "../atoms/BodyText/BodyText";
import { CheckCircleRed } from "../Icons/CheckCirleRed";
// import { CheckCircleGreenIcon } from "../Icons/CheckCircleGreen";
// import { CheckCircle } from "../Icons/CheckCircle";

interface ProfileBadgeCardProps
{
  readonly description: string;
  readonly name: string;
}

const ProfileBadgeCard: FunctionComponent<ProfileBadgeCardProps> = ({ description, name }) => 
{
  const theme = useMantineTheme();
  const [isExpanded, setIsExpanded] = React.useState<boolean>(true);
  return (
    <div css={styles.wrapper({ isExpanded, theme })} onClick={() => setIsExpanded(prev => !prev)}>
      <div css={styles.badgeWrapper({ isExpanded, theme })}>
        <span css={styles.checkCircle}><CheckCircleRed/></span>
        <CaisyImg src={FlagImg.src}/>
        {name && <BodyText css={styles.badgeTitle} styleType="body-02-medium">{name}</BodyText>}
      </div>
      {isExpanded &&
        description && (
        <div css={styles.badgeDescriptionArea}>
          <BodyText css={styles.badgeDescriptionText} styleType="body-02-medium">{description}</BodyText>
        </div>
      )}
    </div>
  );
};

export default ProfileBadgeCard;
