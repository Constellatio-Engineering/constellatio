import React, { FC } from "react";
import { PasswordInputProps, TextInput, TextInputProps, PasswordInput, CSSObject } from "@mantine/core";
import { AlertFilled } from "@/components/Icons/AlertFilled";
import { passwordStyles, textStyles } from "./input.styles";
import { Show } from "@/components/Icons/Show";
import { Hide } from "@/components/Icons/Hide";

type TInput = (TextInputProps | PasswordInputProps) & {
  inputType: "text" | "password";
  labelStyleOverwrite?: CSSObject | undefined;
  inputStyleOverwrite?: CSSObject | undefined;
};

export const Input: FC<TInput> = ({
  inputType,
  labelStyleOverwrite,
  inputStyleOverwrite,
  error,
  disabled,
  ...props
}) => {
  return inputType === "password" ? (
    <PasswordInput
      styles={passwordStyles({ error, disabled, labelStyleOverwrite, inputStyleOverwrite })}
      error={error}
      disabled={disabled}
      visibilityToggleIcon={({ reveal }) => (reveal ? <Show /> : <Hide />)}
      {...props}
    />
  ) : inputType === "text" ? (
    <TextInput
      styles={textStyles({ error, disabled, labelStyleOverwrite, inputStyleOverwrite })}
      error={error}
      disabled={disabled}
      rightSection={error && <AlertFilled />}
      {...props}
    />
  ) : null;
};
