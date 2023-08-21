import { DownloadIcon } from "@/components/Icons/DownloadIcon";

import React from "react";

import { Card } from "./GhostDropCard.styles";
import { BodyText } from "../../atoms/BodyText/BodyText";

export const GhostDropCard = () => 
{
  return (
    <Card>
      <DownloadIcon/>
      <BodyText component="p" styleType="body-01-regular">Drop here</BodyText>
    </Card>
  );
};
