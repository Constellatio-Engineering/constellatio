import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { CheckCircleRed } from "@/components/Icons/CheckCirleRed";
import { type BadgeWithCompletedState } from "@/db/schema";

import { useMantineTheme } from "@mantine/core";
import Image from "next/image";
import React, { type FunctionComponent } from "react";

import { contentComingSoon } from "./ProfileBadgeCard.styles";
import * as styles from "./ProfileBadgeCard.styles";

export interface ProfileBadgeCardProps extends BadgeWithCompletedState
{
  readonly size: "small" | "large";
}

const ProfileBadgeCard: FunctionComponent<ProfileBadgeCardProps> = ({
  description,
  imageFilename,
  isCompleted,
  name,
  publicationState,
  size
}) => 
{
  const theme = useMantineTheme();
  const isSelected = false;
  const isComingSoon = publicationState === "coming-soon";
  const isSmall = size === "small";
  const isLarge = size === "large";

  return (
    <div css={[styles.wrapper, isSmall ? styles.wrapperSmall : styles.wrapperLarge]}>
      {isComingSoon && (
        <div css={styles.comingSoonOverlay}>
          <BodyText css={styles.badgeTitle} styleType="body-01-medium">Coming soon!</BodyText>
        </div>
      )}
      <div css={[
        styles.badgeWrapper({ isExpanded: isLarge, isSelected, theme }),
        isComingSoon && styles.contentComingSoon
      ]}>
        {isCompleted && <span css={styles.checkCircle}><CheckCircleRed/></span>}
        <div css={styles.imageWrapper}>
          <Image
            css={styles.image}
            src={`/images/badges/${imageFilename}`}
            alt="badge symbol"
            fill
          />
        </div>
        <BodyText css={styles.badgeTitle} styleType="body-01-medium">{name}</BodyText>
      </div>
      {(isLarge) && (
        <div css={[
          styles.badgeDescriptionArea({ isExpanded: isLarge, isSelected, theme }),
          isComingSoon && styles.contentComingSoon
        ]}>
          <BodyText css={styles.badgeDescriptionText} styleType="body-02-medium">{description}</BodyText>
        </div>
      )}
    </div>
  );
};

export default ProfileBadgeCard;
