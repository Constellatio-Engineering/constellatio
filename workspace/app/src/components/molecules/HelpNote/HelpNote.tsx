import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { richTextParagraphOverwrite } from "@/components/helpers/richTextParagraphOverwrite";
import { InfoFilled } from "@/components/Icons/InfoFilled";

import { type FC } from "react";

import { HeadingWrapper, IconWrapper, RichTextWrapper, Wrapper } from "./HelpNote.styles";
import { Richtext } from "../Richtext/Richtext";

export type HelpNoteProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly data: any;
};

export const HelpNote: FC<HelpNoteProps> = ({ data }) =>
{
  return (
    <Wrapper>
      <HeadingWrapper>
        <IconWrapper>
          <InfoFilled/>
        </IconWrapper>
        <BodyText component="p" styleType="body-01-medium" style={{ fontSize: 18, marginBottom: 4 }}>Hinweis</BodyText>
      </HeadingWrapper>
      {data?.json && (
        <RichTextWrapper>
          <Richtext data={data} richTextOverwrite={{ paragraph: richTextParagraphOverwrite }}/>
        </RichTextWrapper>
      )}
    </Wrapper>
  );
};
