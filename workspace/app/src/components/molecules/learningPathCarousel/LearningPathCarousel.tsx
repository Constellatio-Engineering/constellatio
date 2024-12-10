import { ArrowLeftWithLine } from "@/components/Icons/ArrowLeftWithLine";
import { ArrowRightWithLine } from "@/components/Icons/ArrowRightWithLine";
import { smallBadgeCardWidth } from "@/components/molecules/profileBadgeCard/ProfileBadgeCard.styles";
import { colooors } from "@/constants/styles/colors";
import { type LearningPathWithProgress } from "@/hooks/useLearningPathProgress";

import { type Nullable } from "@constellatio/utility-types";
import { Carousel } from "@mantine/carousel";
import { type FunctionComponent } from "react";

import SkeletonSlide from "./skeletonSlide/SkeletonSlide";
import { LearningPathCard } from "../learningPathCard/LearningPathCard";

export type LearningPathCarouselProps = {
  readonly isLoading: boolean;
  readonly learningPathId: Nullable<string>;
  readonly units: LearningPathWithProgress["units"];
};

const LearningPathCarousel: FunctionComponent<LearningPathCarouselProps> = ({ isLoading, learningPathId, units }) =>
{
  if(!learningPathId)
  {
    return null;
  }

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
          left: "-45px",
          width: "calc(100% + 90px)",
          zIndex: 2,
        },
        position: "relative",
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
      {units.map((unit, index) => (
        <Carousel.Slide key={unit.id}>
          <LearningPathCard
            {...unit}
            preTitle={`Lektion ${index + 1}`}
            learningPathId={learningPathId}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default LearningPathCarousel;
