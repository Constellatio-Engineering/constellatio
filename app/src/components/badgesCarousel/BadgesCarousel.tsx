import useDashboardPageStore from "@/stores/dashboardPage.store";

import { Carousel } from "@mantine/carousel";
import React, { type FunctionComponent } from "react";

import BadgesDrawer from "../badgesDrawer/BadgesDrawer";
import { ArrowLeftWithLine } from "../Icons/ArrowLeftWithLine";
import { ArrowRightWithLine } from "../Icons/ArrowRightWithLine";
import ProfileBadgeCard from "../molecules/profileBadgeCard/ProfileBadgeCard";

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
      <BadgesDrawer close={() => setIsBadgesDrawerOpened(false)} opened={isBadgesDrawerOpened}/>
    </Carousel>
  );
};

export default BadgesCarousel;
