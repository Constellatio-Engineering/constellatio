import { Button } from "@/components/atoms/Button/Button";
import { richTextParagraphOverwrite } from "@/components/helpers/richTextParagraphOverwrite";
import { ArrowDown } from "@/components/Icons/ArrowDown";
import { ArrowUp } from "@/components/Icons/ArrowUp";
import { Richtext } from "@/components/molecules/Richtext/Richtext";

import { Group, Spoiler, Stack } from "@mantine/core";
import { useMantineTheme } from "@mantine/styles";
import React, { type FC } from "react";

import { calloutStyles, RichTextStyles, spoilerStyles } from "./Callout.styles";
import { HeadingType } from "./HeadingType";

import { type IGenCallout } from "@/services/graphql/__generated/sdk";

export type CalloutProps = IGenCallout;

export const Callout: FC<CalloutProps> = ({ calloutType, expandable, text }) => 
{
  const theme = useMantineTheme();
  const [isContentHide, setIsContentHide] = React.useState<boolean>(true);

  const ShowAllBtn = (
    <Button<"a">
      styleType="tertiary"
      rightIcon={<ArrowDown size={20}/>}
      size="medium"
      style={{ zIndex: 2 }}
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
      style={{ zIndex: 2 }}
      onClick={() => setIsContentHide(true)}
      component="a">
      Einklappen
    </Button>
  );

  return (
    <Stack spacing="spacing-4" sx={calloutStyles(theme)}>
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
            <Richtext
              data={text}
              stylesOverwrite={RichTextStyles}
              richTextOverwrite={{ paragraph: richTextParagraphOverwrite }}
            />
          </Spoiler>
        ) : (
          <Richtext
            data={text}
            stylesOverwrite={RichTextStyles}
            richTextOverwrite={{ paragraph: richTextParagraphOverwrite }}
          />
        ))}
    </Stack>
  );
};
