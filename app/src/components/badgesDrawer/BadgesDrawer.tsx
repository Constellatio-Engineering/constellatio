import { Drawer, ScrollArea } from "@mantine/core";
import React, { type FunctionComponent } from "react";

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
  const badges = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  if(open) { console.log(open); }
  return (
    <Drawer
      opened={opened}
      onClose={close}
      scrollAreaComponent={ScrollArea.Autosize}
      lockScroll={false}
      styles={{
        body: { padding: "0" }
      }}
      withCloseButton={false}
      size="lg"
      position="right">
      {/* Drawer content */}
      <SlidingPanelTitle
        title="Badges"
        variant="default"
        closeButtonAction={close}
      />
      <div css={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        padding: "16px 32px"
      }}>
        {badges.map((badge, index) => (
          <ProfileBadgeCard
            key={index}
            name="Test1"
            description="Test1"
            size="large"
         
          />
        ))}
      </div>
    </Drawer>
  );
};

export default BadgesDrawer;
