import { ArrowLeftWithLine } from "@/components/Icons/ArrowLeftWithLine";
import { ArrowRightWithLine } from "@/components/Icons/ArrowRightWithLine";
import { smallBadgeCardWidth } from "@/components/molecules/profileBadgeCard/ProfileBadgeCard.styles";
import { colooors } from "@/constants/styles/colors";
import useBadges from "@/hooks/useBadges";
import { Carousel } from "@mantine/carousel";
import { type FunctionComponent } from "react";
import SkeletonSlide from "./skeletonSlide/SkeletonSlide";
import { LearningPathCard } from "../learningPathCard/LearningPathCard";

const LearningPathCarousel: FunctionComponent = () => {
  const {
    getBadgesResult: { badges },
    isLoading,
  } = useBadges();

  /* TODO: 
  
    - load all UNITS not badges
      + use hook 
        + trpc endpoint
  
  */

  /* FIXME: 
  
  - Slider geht immer auf ausgangsposition zurück (zumindest im Desktop viewport)
  - Arrow Button is missing
  
  */

  return (
    <Carousel
      slideSize={`${smallBadgeCardWidth}px`}
      controlsOffset={0}
      controlSize={32}
      sx={{
        "&::after": {
          background: `linear-gradient(to left, ${colooors["neutrals-01"][0]} 0%, rgba(255,255,255,0) 10%)`,
          content: "''",
          height: "100%",
          left: "0px",
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          width: "100%",
          zIndex: 1,
        },
        ".mantine-Carousel-controls": {
          ".mantine-Carousel-control": {
            backgroundColor: colooors["neutrals-01"][0],
            opacity: 1,
          },
          "[data-inactive]": {
            opacity: 0,
          },
          left: "-35px",
          width: "calc(100% + 70px)",
        },
        position: "relative",
      }}
      nextControlIcon={<ArrowRightWithLine size={16} />}
      previousControlIcon={<ArrowLeftWithLine size={16} />}
      slideGap="16px"
      align="start"
      slidesToScroll="auto"
    >
      {isLoading && (
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <Carousel.Slide key={index}>
              <SkeletonSlide />
            </Carousel.Slide>
          ))}
        </>
      )}
      {badges.map((badge) => (
        <Carousel.Slide key={badge.id}>
          <LearningPathCard
            title="ArbR 1 | Working with young unicor..."
            status="completed"
            onClick={() => console.log("Card clicked")}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default LearningPathCarousel;
