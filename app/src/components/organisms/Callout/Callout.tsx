import { Button } from "@/components/atoms/Button/Button";
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
      component="a"
      styleType="tertiary"
      rightIcon={<ArrowDown size={20}/>}
      size="medium"
      onClick={() => setIsContentHide(false)}>
      Show all
    </Button>
  );

  const ShowLessBtn = (
    <Button<"a">
      component="a"
      styleType="tertiary"
      rightIcon={<ArrowUp size={20}/>}
      size="medium"
      onClick={() => setIsContentHide(true)}>
      Show less
    </Button>
  );
  return (
    <Stack spacing="spacing-4" sx={calloutStyles()}>
      {calloutType && (
        <Group spacing="spacing-8">
          <HeadingType calloutType={calloutType}/>
        </Group>
      )}
      {text?.richTextContent?.json &&
        (expandable ? (
          <Spoiler
            hideLabel={ShowLessBtn}
            maxHeight={190}
            showLabel={ShowAllBtn}
            styles={spoilerStyles({ isContentHide })}>
            <Richtext richTextContent={text.richTextContent} stylesOverwrite={RichTextStyles}/>
          </Spoiler>
        ) : (
          <Richtext richTextContent={text.richTextContent} stylesOverwrite={RichTextStyles}/>
        ))}
    </Stack>
  );
};
