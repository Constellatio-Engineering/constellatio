import useBadges from "@/hooks/useBadges";

import { Drawer, ScrollArea } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./BadgesDrawer.styles";
import ProfileBadgeCard from "../molecules/profileBadgeCard/ProfileBadgeCard";
import SlidingPanelTitle from "../molecules/slidingPanelTitle/SlidingPanelTitle";

interface BadgesDrawerProps
{
  readonly close: () => void;
  readonly open?: () => void;
  readonly opened: boolean;
}

const BadgesDrawer: FunctionComponent<BadgesDrawerProps> = ({ close, open, opened }) => 
{
  const { getBadgesResult: { badges } } = useBadges();

  return (
    <Drawer
      opened={opened}
      onClose={close}
      scrollAreaComponent={ScrollArea.Autosize}
      lockScroll={false}
      styles={{ body: { padding: "0" } }}
      withCloseButton={false}
      size="lg"
      position="right">
      <SlidingPanelTitle
        title="Badges"
        variant="default"
        closeButtonAction={close}
      />
      <div css={styles.badgesWrapper}>
        {badges.map((badge) => (
          <ProfileBadgeCard
            key={badge.id}
            {...badge}
            size="large"
          />
        ))}
      </div>
    </Drawer>
  );
};

export default BadgesDrawer;
