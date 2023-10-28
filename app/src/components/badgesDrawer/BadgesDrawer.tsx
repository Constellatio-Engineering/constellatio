import useBadges from "@/hooks/useBadges";
import useDashboardPageStore from "@/stores/dashboardPage.store";

import { Drawer, ScrollArea } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./BadgesDrawer.styles";
import ProfileBadgeCard from "../molecules/profileBadgeCard/ProfileBadgeCard";
import SlidingPanelTitle from "../molecules/slidingPanelTitle/SlidingPanelTitle";

const BadgesDrawer: FunctionComponent = () =>
{
  const closeDrawer = useDashboardPageStore(s => s.closeDrawer);
  const drawerState = useDashboardPageStore(s => s.drawerState);
  const { getBadgesResult: { badges } } = useBadges();

  return (
    <Drawer
      opened={drawerState.isDrawerOpened}
      onClose={closeDrawer}
      scrollAreaComponent={ScrollArea.Autosize}
      lockScroll={false}
      styles={{ body: { padding: "0" } }}
      withCloseButton={false}
      size="xl"
      position="right">
      <SlidingPanelTitle
        title="Badges"
        variant="default"
        closeButtonAction={closeDrawer}
      />
      <div css={styles.badgesWrapper}>
        {badges.map((badge) => (
          <ProfileBadgeCard
            key={badge.id}
            {...badge}
            size="large"
            isHighlighted={drawerState.isDrawerOpened && drawerState.selectedBadgeId === badge.id}
          />
        ))}
      </div>
    </Drawer>
  );
};

export default BadgesDrawer;
