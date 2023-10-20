import { Carousel } from "@mantine/carousel";
import React, { type FunctionComponent } from "react";

import ProfileBadgeCard from "../molecules/profileBadgeCard/ProfileBadgeCard";

const BadgesCarousel: FunctionComponent = () => (
  <Carousel
    slideSize="160px"
    withIndicators
    slideGap="16px"
    align="start"
    slidesToScroll="auto">
    <Carousel.Slide>
      <ProfileBadgeCard
        name="Test1"
        description="Test1"
        size="small"
      />
    </Carousel.Slide>
    <Carousel.Slide> 
      <ProfileBadgeCard
        name="Tes2t"
        description="Test2"
        size="small"
      />
    </Carousel.Slide>
    <Carousel.Slide> 
      <ProfileBadgeCard
        name="Tes3t"
        description="Test3"
        size="small"
      />
    </Carousel.Slide>
  </Carousel>
);

export default BadgesCarousel;
