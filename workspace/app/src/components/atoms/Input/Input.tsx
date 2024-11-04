import { AlertFilled } from "@/components/Icons/AlertFilled";
import { Hide } from "@/components/Icons/Hide";
import { Show } from "@/components/Icons/Show";

import {
  type CSSObject, PasswordInput, type PasswordInputProps, TextInput, type TextInputProps 
} from "@mantine/core";
import { useMantineTheme } from "@mantine/styles";
import { type FC } from "react";

import { passwordStyles, textStyles } from "./input.styles";

export type InputProps = (TextInputProps | PasswordInputProps) & {
  readonly inputStyleOverwrite?: CSSObject | undefined;
  readonly inputType: "text" | "password" | "number";
  readonly labelStyleOverwrite?: CSSObject | undefined;
};

export const Input: FC<InputProps> = ({
  disabled,
  error,
  inputStyleOverwrite,
  inputType,
  labelStyleOverwrite,
  ...props
}) => 
{
  const theme = useMantineTheme();

  return inputType === "password" ? (
    <PasswordInput
      styles={passwordStyles({
        disabled, error, inputStyleOverwrite, labelStyleOverwrite, theme
      })}
      error={error}
      disabled={disabled}
      // eslint-disable-next-line react/no-unstable-nested-components
      visibilityToggleIcon={({ reveal }) => (reveal ? <Show/> : <Hide/>)}
      {...props}
    />
  ) : inputType === "text" ? (
    <TextInput
      styles={textStyles({
        disabled, error, inputStyleOverwrite, labelStyleOverwrite, theme
      })}
      error={error}
      disabled={disabled}
      rightSection={error && <AlertFilled/>}
      rightSectionWidth={error ? 32 : 0}
      {...props}
    />
  ) : null;
};
