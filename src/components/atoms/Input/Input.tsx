import { AlertFilled } from "@/components/Icons/AlertFilled";
import { Hide } from "@/components/Icons/Hide";
import { Show } from "@/components/Icons/Show";

import {
  type PasswordInputProps, TextInput, type TextInputProps, PasswordInput, type CSSObject 
} from "@mantine/core";
import React, { type FC } from "react";

import { passwordStyles, textStyles } from "./input.styles";

type TInput = (TextInputProps | PasswordInputProps) & {
  readonly inputStyleOverwrite?: CSSObject | undefined;
  readonly inputType: "text" | "password" | "number";
  readonly labelStyleOverwrite?: CSSObject | undefined;
};

export const Input: FC<TInput> = ({
  disabled,
  error,
  inputStyleOverwrite,
  inputType,
  labelStyleOverwrite,
  ...props
}) => 
{
  return inputType === "password" ? (
    <PasswordInput
      styles={passwordStyles({
        disabled, error, inputStyleOverwrite, labelStyleOverwrite 
      })}
      error={error}
      disabled={disabled}
      visibilityToggleIcon={({ reveal }) => (reveal ? <Show/> : <Hide/>)}
      {...props}
    />
  ) : inputType === "text" ? (
    <TextInput
      styles={textStyles({
        disabled, error, inputStyleOverwrite, labelStyleOverwrite 
      })}
      error={error}
      disabled={disabled}
      rightSection={error && <AlertFilled/>}
      {...props}
    />
    
  ) : null;
};
