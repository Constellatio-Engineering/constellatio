import { Check } from "@/components/Icons/Check";
import { Cross } from "@/components/Icons/Cross";

import React, { type FC } from "react";

import { Card, IconWrapper, LabelWrapper, TextWrapper } from "./ResultCard.stlyes";
import { CaptionText } from "../../atoms/CaptionText/CaptionText";

export interface ResultCardProps
{
  readonly droppedCorrectCards: number;
  readonly hideCounter?: boolean;
  readonly message: string;
  readonly totalCorrectCards: number;
  readonly variant: "win" | "lose";
}

export const ResultCard: FC<ResultCardProps> = ({
  droppedCorrectCards,
  hideCounter,
  message,
  totalCorrectCards,
  variant
}) => 
{
  return (
    <Card variant={variant}>
      {message && (
        <TextWrapper variant={variant}>
          <IconWrapper variant={variant}>{variant === "win" ? <Check size={24}/> : <Cross size={24}/>}</IconWrapper>
          <CaptionText styleType="caption-01-bold" tt="uppercase" component="p">
            {message}
          </CaptionText>
        </TextWrapper>
      )}
      {(hideCounter !== true) && (
        <LabelWrapper variant={variant}>
          <CaptionText styleType="caption-01-bold" component="p">
            {droppedCorrectCards} / {totalCorrectCards}
          </CaptionText>
        </LabelWrapper>
      )}
    </Card>
  );
};
