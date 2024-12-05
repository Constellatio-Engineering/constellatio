import { ArrowLeftWithLine } from "@/components/Icons/ArrowLeftWithLine";
import { ArrowRightWithLine } from "@/components/Icons/ArrowRightWithLine";
import { smallBadgeCardWidth } from "@/components/molecules/profileBadgeCard/ProfileBadgeCard.styles";
import { colooors } from "@/constants/styles/colors";

import { type IGenLearningPath } from "@constellatio/cms/generated-types";
import { Carousel } from "@mantine/carousel";
import { type FunctionComponent } from "react";

import SkeletonSlide from "./skeletonSlide/SkeletonSlide";
import { LearningPathCard } from "../learningPathCard/LearningPathCard";

type Props = Pick<IGenLearningPath, "id" | "units"> & {
  readonly isLoading: boolean;
};

const LearningPathCarousel: FunctionComponent<Props> = ({ id: learningPathId, isLoading, units }) =>
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
      {units?.filter(Boolean).map((unit, index) => (
        <Carousel.Slide key={unit.id}>
          <LearningPathCard
            completedCount={0}
            totalCount={(unit.contentPieces?.length ?? 0) + (unit.learningTests?.length ?? 0)}
            preTitle={`Lektion ${index + 1}`}
            title={unit.title || "Kein Titel"}
            status="upcoming"
            learningPathId={learningPathId}
            unit={unit}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default LearningPathCarousel;
