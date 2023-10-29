import SkeletonSlide from "@/components/badgesCarousel/skeletonSlide/SkeletonSlide";
import useBadges from "@/hooks/useBadges";

import { Carousel } from "@mantine/carousel";
import React, { type FunctionComponent } from "react";

import BadgesDrawer from "../badgesDrawer/BadgesDrawer";
import { ArrowLeftWithLine } from "../Icons/ArrowLeftWithLine";
import { ArrowRightWithLine } from "../Icons/ArrowRightWithLine";
import ProfileBadgeCard from "../molecules/profileBadgeCard/ProfileBadgeCard";

const BadgesCarousel: FunctionComponent = () => 
{
  const { getBadgesResult: { badges }, isLoading } = useBadges();

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
      {isLoading && (
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <Carousel.Slide key={index}>
              <SkeletonSlide/>
            </Carousel.Slide>
          ))}
        </>
      )}
      {badges.map((badge) => (
        <Carousel.Slide key={badge.id}>
          <ProfileBadgeCard {...badge} size="small"/>
        </Carousel.Slide>
      ))}
      <BadgesDrawer/>
    </Carousel>
  );
};

export default BadgesCarousel;
