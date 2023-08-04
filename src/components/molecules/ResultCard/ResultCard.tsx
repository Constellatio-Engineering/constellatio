import React, { FC } from "react";
import { CaptionText } from "../../atoms/CaptionText/CaptionText";
import { Card, IconWrapper, LabelWrapper, TextWrapper } from "./ResultCard.stlyes";
import { Check } from "@/components/Icons/Check";
import { Cross } from "@/components/Icons/Cross";

type TResultCard = {
  variant: "win" | "lose";
  totalCorrectCards: number;
  droppedCorrectCards: number;
  message: string;
};

export const ResultCard: FC<TResultCard> = ({ message, droppedCorrectCards, totalCorrectCards, variant }) => {
  return (
    <Card variant={variant}>
      {message && (
        <TextWrapper variant={variant}>
          <IconWrapper variant={variant}>{variant === "win" ? <Check size={24} /> : <Cross size={24} />}</IconWrapper>
          <CaptionText styleType="caption-01-bold" tt={"uppercase"} component="p">
            {message}
          </CaptionText>
        </TextWrapper>
      )}
      {droppedCorrectCards && totalCorrectCards && (
        <LabelWrapper variant={variant}>
          <CaptionText styleType="caption-01-bold" component="p">
            {droppedCorrectCards} / {totalCorrectCards}
          </CaptionText>
        </LabelWrapper>
      )}
    </Card>
  );
};
