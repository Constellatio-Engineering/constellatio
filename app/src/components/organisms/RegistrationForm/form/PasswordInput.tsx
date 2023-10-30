import { Input } from "@/components/atoms/Input/Input";
import { PasswordValidationSchema } from "@/components/helpers/PasswordValidationSchema";

import { Box, type TextInputProps } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { type FunctionComponent } from "react";

type Props = {
  readonly confirmPasswordInputProps: TextInputProps;
  readonly currentPassword: string;
  readonly passwordInputProps: TextInputProps;
};

const PasswordInput: FunctionComponent<Props> = ({ confirmPasswordInputProps, currentPassword, passwordInputProps }) =>
{
  const [isPasswordRevealed, { toggle }] = useDisclosure(false);

  return (
    <>
      <Box>
        <Input
          {...passwordInputProps}
          inputType="password"
          label="Passwort*"
          title="Passwort"
          placeholder={"*".repeat(16)}
          onVisibilityChange={toggle}
        />
        <PasswordValidationSchema
          passwordValue={currentPassword}
          isPasswordRevealed={isPasswordRevealed}
        />
      </Box>
      <Input
        {...confirmPasswordInputProps}
        inputType="password"
        label="Passwort bestätigen*"
        placeholder={"*".repeat(16)}
        title="Passwort bestätigen"
        onVisibilityChange={toggle}
      />
    </>
  );
};

export default PasswordInput;
