import CaisyIcon from "@/basic-components/CaisyIcon";
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Richtext } from "@/components/molecules/Richtext/Richtext";
import { IGenCallout } from "@/services/graphql/__generated/sdk";
import { Box, Group, Spoiler, Stack } from "@mantine/core";
import React, { FC } from "react";
import { RichTextStyles, calloutStyles, spoilerStyles } from "./Callout.styles";
import { Button } from "@/components/atoms/Button/Button";
import { ArrowDown } from "@/components/Icons/ArrowDown";
import { ArrowUp } from "@/components/Icons/ArrowUp";

type TCallout = IGenCallout;

export const Callout: FC<TCallout> = ({ icon, title, text, expandable }) => {
  const [isContentHide, setIsContentHide] = React.useState<boolean>(true);

  const ShowAllBtn = (
    <Button
      styleType="tertiary"
      rightIcon={<ArrowDown size={20} />}
      size="medium"
      onClick={() => setIsContentHide(false)}
    >
      Show all
    </Button>
  );

  const ShowLessBtn = (
    <Button styleType="tertiary" rightIcon={<ArrowUp size={20} />} size="medium" onClick={() => setIsContentHide(true)}>
      Show less
    </Button>
  );
  return (
    <Stack spacing={"spacing-4"} sx={calloutStyles()}>
      <Group spacing={"spacing-8"}>
        {icon?.src && <CaisyIcon src={icon.src} description={icon?.description ?? ""} />}
        {title && <BodyText component="p" styleType="body-01-bold">{title}</BodyText>}
      </Group>
      {text?.richTextContent?.json &&
        (expandable ? (
          <Spoiler
            hideLabel={ShowLessBtn}
            maxHeight={190}
            showLabel={ShowAllBtn}
            styles={spoilerStyles({ isContentHide: isContentHide })}
          >
            <Richtext richTextContent={text.richTextContent} stylesOverwrite={RichTextStyles} />
          </Spoiler>
        ) : (
          <Richtext richTextContent={text.richTextContent} stylesOverwrite={RichTextStyles} />
        ))}
    </Stack>
  );
};
