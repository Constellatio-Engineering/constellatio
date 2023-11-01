import { Button } from "@/components/atoms/Button/Button";
import { richTextParagraphOverwrite } from "@/components/helpers/richTextParagraphOverwrite";
import { ArrowDown } from "@/components/Icons/ArrowDown";
import { ArrowUp } from "@/components/Icons/ArrowUp";
import { Richtext } from "@/components/molecules/Richtext/Richtext";
import { type IGenCallout } from "@/services/graphql/__generated/sdk";

import { Group, Spoiler, Stack } from "@mantine/core";
import React, { type FC } from "react";

import { RichTextStyles, calloutStyles, spoilerStyles } from "./Callout.styles";
import { HeadingType } from "./HeadingType";

export type CalloutProps = IGenCallout;

export const Callout: FC<CalloutProps> = ({ calloutType, expandable, text }) => 
{
  const [isContentHide, setIsContentHide] = React.useState<boolean>(true);

  const ShowAllBtn = (
    <Button<"a">
      styleType="tertiary"
      rightIcon={<ArrowDown size={20}/>}
      size="medium"
      onClick={() => setIsContentHide(false)}
      component="a">
      Ausklappen
    </Button>
  );

  const ShowLessBtn = (
    <Button<"a">
      styleType="tertiary"
      rightIcon={<ArrowUp size={20}/>}
      size="medium"
      onClick={() => setIsContentHide(true)}
      component="a">
      Einklappen
    </Button>
  );

  return (
    <Stack spacing="spacing-4" sx={calloutStyles()}>
      <Group spacing="spacing-8">
        <HeadingType calloutType={calloutType}/>
      </Group>
      {text?.json &&
        (expandable ? (
          <Spoiler
            hideLabel={ShowLessBtn}
            maxHeight={190}
            showLabel={ShowAllBtn}
            styles={spoilerStyles({ isContentHide })}>
            <Richtext data={text} stylesOverwrite={RichTextStyles}/>
          </Spoiler>
        ) : (
          <Richtext data={text} stylesOverwrite={RichTextStyles} richTextOverwrite={{ paragraph: richTextParagraphOverwrite }}/>
        ))}
    </Stack>
  );
};
