import { DownloadIcon } from "@/components/Icons/DownloadIcon";
import { Notepad } from "@/components/Icons/Notepad";
import { NotepadFilled } from "@/components/Icons/NotepadFilled";
import { OpenInNew } from "@/components/Icons/OpenInNew";
import { Pin } from "@/components/Icons/Pin";

import { Button, type ButtonProps, createPolymorphicComponent } from "@mantine/core";
import { useMantineTheme } from "@mantine/styles";
import React, { type FC } from "react";

import { floatingButtonStyles } from "./FloatingButton.styles";
import { BodyText } from "../BodyText/BodyText";

export type FloatingButtonVariation = "icon-big" | "icon-medium" | "pins" | "notes-notes" | "notes-no-notes" | "open-in-new-tab";

type TFloatingButton = ButtonProps & {
  readonly pinsNotificationsAmount?: number;
  readonly variation: FloatingButtonVariation;
};

const FloatingButtonComponent: FC<TFloatingButton> = ({
  pinsNotificationsAmount,
  variation,
  ...props
}) => 
{
  const theme = useMantineTheme();

  const ButtonIcons =
    variation === "icon-big" || variation === "icon-medium" ? (
      <DownloadIcon/>
    ) : variation === "pins" ? (
      <Pin/>
    ) : variation === "notes-notes" ? (
      <NotepadFilled/>
    ) : variation === "notes-no-notes" ? (
      <Notepad/>
    ) : variation === "open-in-new-tab" ? (
      <OpenInNew/>
    ) : null;

  const buttonText =
    variation === "pins"
      ? "Your pins"
      : variation === "notes-notes"
        ? "Notes"
        : variation === "notes-no-notes"
          ? "Add notes"
          : null;

  return (
    <Button<"button">
      unstyled
      styles={floatingButtonStyles({ pinsNotificationsAmount, theme, variation })}
      rightIcon={ButtonIcons}
      {...props}>
      {buttonText && <BodyText component="p" styleType="body-01-medium">{buttonText}</BodyText>}
    </Button>
  );
};

export const FloatingButton = createPolymorphicComponent<"button", TFloatingButton>(FloatingButtonComponent);
