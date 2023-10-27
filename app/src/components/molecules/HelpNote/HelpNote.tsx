import { InfoFilled } from "@/components/Icons/InfoFilled";

import React, { type FC } from "react";

import { IconWrapper, RichTextWrapper, Wrapper } from "./HelpNote.styles";
import { Richtext } from "../Richtext/Richtext";

export type HelpNoteProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly data: any;
};

export const HelpNote: FC<HelpNoteProps> = ({ data }) =>
{
  return (
    <Wrapper>
      <IconWrapper>
        <InfoFilled/>
      </IconWrapper>
      {data?.json && (
        <RichTextWrapper>
          <Richtext data={data}/>
        </RichTextWrapper>
      )}
    </Wrapper>
  );
};
