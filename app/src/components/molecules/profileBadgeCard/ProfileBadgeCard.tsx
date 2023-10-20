import CaisyImg from "@/basic-components/CaisyImg";
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { CheckCircleRed } from "@/components/Icons/CheckCirleRed";

import { useMantineTheme } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileBadgeCard.styles";
import FlagImg from "../../../../public/images/placeholder-flag.png";

interface ProfileBadgeCardProps
{
  readonly checked?: boolean;
  readonly description: string;
  readonly name: string;
  readonly size: "small" | "large";
}

const ProfileBadgeCard: FunctionComponent<ProfileBadgeCardProps> = ({
  checked,
  description,
  name,
  size
}) => 
{
  const theme = useMantineTheme();
  // const [isExpanded] = React.useState<boolean>(size === "large" ? true : false);
  const isExpanded = size === "large" ? true : false;
  return (
    <div css={styles.wrapper({ isExpanded, theme })}>
      <div css={styles.badgeWrapper({ isExpanded, theme })}>
        {checked && <span css={styles.checkCircle}><CheckCircleRed/></span>}
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
