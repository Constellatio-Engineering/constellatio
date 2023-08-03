import { IGenTextElement } from "@/services/graphql/__generated/sdk";
import React, { FC } from "react";
import { IconWrapper, RichTextWrapper, Wrapper } from "./HelpNote.styles";
import { Richtext } from "../Richtext/Richtext";
import { InfoFilled } from "@/components/Icons/InfoFilled";

type THelpNote = IGenTextElement;

export const HelpNote: FC<THelpNote> = ({ richTextContent }) => {
  return (
    <Wrapper>
      <IconWrapper>
        <InfoFilled />
      </IconWrapper>
      {richTextContent?.json && (
        <RichTextWrapper>
          <Richtext richTextContent={richTextContent} />
        </RichTextWrapper>
      )}
    </Wrapper>
  );
};
