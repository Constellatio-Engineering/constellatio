import { BodyText } from "@/components/atoms/BodyText/BodyText";
import BadgeImage from "@/components/badgeImage/BadgeImage";
import { CheckCircleRed } from "@/components/Icons/CheckCirleRed";
import { type BadgeWithUserData } from "@/db/schema";
import useDashboardPageStore from "@/stores/dashboardPage.store";

import React, { type FunctionComponent, useEffect, useRef, useState } from "react";

import * as styles from "./ProfileBadgeCard.styles";

interface ProfileBadgeCardProps extends BadgeWithUserData
{
  readonly isHighlighted?: boolean;
  readonly size: "small" | "large";
}

const ProfileBadgeCard: FunctionComponent<ProfileBadgeCardProps> = ({
  description,
  id,
  imageFilename,
  isCompleted,
  isHighlighted = false,
  name,
  publicationState,
  size,
}) => 
{
  const isComingSoon = publicationState === "coming-soon";
  const isSmall = size === "small";
  const isLarge = size === "large";
  const openDrawer = useDashboardPageStore(s => s.openDrawer);
  const [shouldBeHighlighted, setShouldBeHighlighted] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() =>
  {
    if(timeoutRef.current)
    {
      clearTimeout(timeoutRef.current);
    }

    if(isHighlighted)
    {
      if(wrapperRef.current)
      {
        wrapperRef.current.scrollIntoView({ behavior: "smooth" });
      }
      setShouldBeHighlighted(true);
      timeoutRef.current = setTimeout(() => setShouldBeHighlighted(false), 4000);
    }

    return () =>
    {
      if(timeoutRef.current)
      {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isHighlighted]);

  return (
    <div
      ref={wrapperRef}
      onClick={() =>
      {
        if(publicationState === "published")
        {
          openDrawer({ selectedBadgeId: id });
        }
      }}
      css={[
        styles.wrapper,
        isSmall ? styles.wrapperSmall : styles.wrapperLarge(shouldBeHighlighted),
        isComingSoon && styles.wrapperDisabled
      ]}>
      {isComingSoon && (
        <div css={styles.comingSoonOverlay}>
          <BodyText css={styles.badgeTitle} styleType="body-01-medium">Coming soon!</BodyText>
        </div>
      )}
      <div css={[
        styles.badgeWrapper,
        isSmall ? styles.badgeWrapperSmall : styles.badgeWrapperLarge,
        isComingSoon && styles.contentComingSoon
      ]}>
        {isCompleted && <span css={styles.checkCircle}><CheckCircleRed/></span>}
        <div css={styles.imageWrapper}>
          <BadgeImage css={styles.badgeImage} filename={imageFilename}/>
        </div>
        <BodyText css={styles.badgeTitle} styleType="body-01-medium">
          {name}
        </BodyText>
      </div>
      {isLarge && (
        <div css={[styles.badgeDescriptionArea, isComingSoon && styles.contentComingSoon]}>
          <BodyText css={styles.badgeDescriptionText} styleType="body-01-medium">{description}</BodyText>
        </div>
      )}
    </div>
  );
};

export default ProfileBadgeCard;
