import { DownloadIcon } from "@/components/Icons/DownloadIcon";
import React from "react";
import { BodyText } from "../BodyText/BodyText";
import { Card } from "./GhostDropCard.styles";

export const GhostDropCard = () => {
  return (
    <Card>
      <DownloadIcon />
      <BodyText component="p" styleType="body-01-regular">Drop here</BodyText>
    </Card>
  );
};
