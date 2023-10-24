import useDashboardPageStore from "@/stores/dashboardPage.store";

import { Carousel } from "@mantine/carousel";
import { Drawer, ScrollArea } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import { ArrowLeftWithLine } from "../Icons/ArrowLeftWithLine";
import { ArrowRightWithLine } from "../Icons/ArrowRightWithLine";
import ProfileBadgeCard from "../molecules/profileBadgeCard/ProfileBadgeCard";
import SlidingPanelTitle from "../molecules/slidingPanelTitle/SlidingPanelTitle";

const BadgesCarousel: FunctionComponent = () => 
{
  const badges = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const isBadgesDrawerOpened = useDashboardPageStore(s => s.isBadgesDrawerOpened);
  const setIsBadgesDrawerOpened = useDashboardPageStore(s => s.setIsBadgesDrawerOpened);

  return (
    <Carousel
      slideSize="160px"
      controlsOffset="xs"
      controlSize={32}
      nextControlIcon={<ArrowRightWithLine size={16}/>}
      previousControlIcon={<ArrowLeftWithLine size={16}/>}
      slideGap="16px"
      align="start"
      slidesToScroll="auto">
      {badges.map((badge, index) => (
        <Carousel.Slide key={index}>
          <ProfileBadgeCard
            name="Test1"
            description="Test1"
            size="small"
          />
        </Carousel.Slide>
      ))}
      <Drawer
        opened={isBadgesDrawerOpened}
        onClose={() => setIsBadgesDrawerOpened(false)}
        scrollAreaComponent={ScrollArea.Autosize}
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
          closeButtonAction={() => setIsBadgesDrawerOpened(false)}
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
    </Carousel>
  );
};

export default BadgesCarousel;
