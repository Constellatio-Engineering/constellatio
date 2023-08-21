import { DownloadIcon } from "@/components/Icons/DownloadIcon";
import { Notepad } from "@/components/Icons/Notepad";
import { NotepadFilled } from "@/components/Icons/NotepadFilled";
import { Pin } from "@/components/Icons/Pin";

import { Button, type ButtonProps, createPolymorphicComponent } from "@mantine/core";
import React, { type FC } from "react";

import { floatingButtonStyles } from "./FloatingButton.styles";
import { BodyText } from "../BodyText/BodyText";

type TFloatingButton = ButtonProps & {
  readonly pinsNotificationsAmount?: number;
  readonly variation: "icon-big" | "icon-medium" | "pins" | "notes-notes" | "notes-no-notes";
};

export const _FloatingButton: FC<TFloatingButton> = ({
  pinsNotificationsAmount,
  variation,
  ...props
}) => 
{
  const ButtonIcons =
    variation === "icon-big" || variation === "icon-medium" ? (
      <DownloadIcon/>
    ) : variation === "pins" ? (
      <Pin/>
    ) : variation === "notes-notes" ? (
      <NotepadFilled/>
    ) : variation === "notes-no-notes" ? (
      <Notepad/>
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
    <Button
      unstyled
      styles={floatingButtonStyles({ pinsNotificationsAmount, variation })}
      rightIcon={ButtonIcons}
      {...props}>
      {buttonText && <BodyText component="p" styleType="body-01-medium">{buttonText}</BodyText>}
    </Button>
  );
};

export const FloatingButton = createPolymorphicComponent<"button", TFloatingButton>(_FloatingButton);
