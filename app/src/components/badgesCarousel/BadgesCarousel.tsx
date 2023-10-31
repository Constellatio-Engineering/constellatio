import SkeletonSlide from "@/components/badgesCarousel/skeletonSlide/SkeletonSlide";
import useBadges from "@/hooks/useBadges";

import { Carousel } from "@mantine/carousel";
import { useMantineTheme } from "@mantine/styles";
import React, { type FunctionComponent } from "react";

import BadgesDrawer from "../badgesDrawer/BadgesDrawer";
import { ArrowLeftWithLine } from "../Icons/ArrowLeftWithLine";
import { ArrowRightWithLine } from "../Icons/ArrowRightWithLine";
import ProfileBadgeCard from "../molecules/profileBadgeCard/ProfileBadgeCard";

const BadgesCarousel: FunctionComponent = () => 
{
  const { getBadgesResult: { badges }, isLoading } = useBadges();
  const theme = useMantineTheme();
  // const { entry, ref } = useIntersection();
  return (
    <Carousel
      slideSize="160px"
      controlsOffset={0}
      controlSize={32}
      sx={{
        "&::after": {
          background: `linear-gradient(to left, ${theme.colors["neutrals-01"][0]} 0%, rgba(255,255,255,0) 10%)`,
          content: "''",
          height: "100%",
          left: "0px",
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          width: "100%",
          zIndex: 1
        },
        ".mantine-Carousel-controls": {
          ".mantine-Carousel-control": {
            backgroundColor: theme.colors["neutrals-01"][0],
            opacity: 1,
          },
          "[data-inactive]": {
            opacity: 0,
          },
          left: "-3%",
          width: "106%",
        },
        position: "relative"
      }}
      nextControlIcon={<ArrowRightWithLine size={16}/>}
      previousControlIcon={<ArrowLeftWithLine size={16}/>}
      slideGap="16px"
      align="start"
      slidesToScroll="auto">
      {isLoading && (
        <>
          {Array.from({ length: 6 }).map((_, index) => (
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
