import { InfoFilled } from "@/components/Icons/InfoFilled";
import { type IGenTextElement } from "@/services/graphql/__generated/sdk";

import React, { type FC } from "react";

import { IconWrapper, RichTextWrapper, Wrapper } from "./HelpNote.styles";
import { Richtext } from "../Richtext/Richtext";

export type HelpNoteProps = IGenTextElement;

export const HelpNote: FC<HelpNoteProps> = ({ richTextContent }) =>
{
  return (
    <Wrapper>
      <IconWrapper>
        <InfoFilled/>
      </IconWrapper>
      {richTextContent?.json && (
        <RichTextWrapper>
          <Richtext richTextContent={richTextContent}/>
        </RichTextWrapper>
      )}
    </Wrapper>
  );
};
