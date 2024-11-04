import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { AlertStoke } from "@/components/Icons/AlertStroke";
import { Article } from "@/components/Icons/Article";
import { Bookmark } from "@/components/Icons/Bookmark";
import { MedalIcon } from "@/components/Icons/MedalIcon";
import { Pen } from "@/components/Icons/Pen";
import { Quote } from "@/components/Icons/Quote";
import { StarIcon } from "@/components/Icons/StarIcon";

import { type IGenCallout } from "@constellatio/cms/generated-types";
import { type FunctionComponent } from "react";

export const HeadingType: FunctionComponent<Pick<IGenCallout, "calloutType">> = ({ calloutType }) => 
{
  switch (calloutType)
  {
    case "remember":
      return (
        <>
          <StarIcon/>
          <BodyText component="p" styleType="body-01-bold" tt="capitalize">Merke</BodyText>
        </>
      );

    case "bestPractice":
      return (
        <>
          <MedalIcon/>
          <BodyText component="p" styleType="body-01-bold" tt="capitalize">Klausurtipp</BodyText>
        </>
      );

    case "definition":
      return (
        <>
          <Pen/>
          <BodyText component="p" styleType="body-01-bold" tt="capitalize">Definition</BodyText>
        </>
      ); 

    case "quote":
      return (
        <>
          <Quote/>
          <BodyText component="p" styleType="body-01-bold" tt="capitalize">Zitat</BodyText>
        </>
      );

    case "example": 
      return (
        <>
          <Article/>
          <BodyText component="p" styleType="body-01-bold" tt="capitalize">Beispiel</BodyText>
        </>
      );

    case "lawReference":
      return (
        <>
          <Bookmark/>
          <BodyText component="p" styleType="body-01-bold" tt="capitalize">Gesetzesverweis</BodyText>
        </>
      );

    case "specialProblem":
      return (
        <>
          <AlertStoke/>
          <BodyText component="p" styleType="body-01-bold" tt="capitalize">Problem</BodyText>
        </>
      );

    default:
      return (
        <>
          <StarIcon/>
          <BodyText component="p" styleType="body-01-bold" tt="capitalize">Merke</BodyText>
        </>
      );
  }
};
