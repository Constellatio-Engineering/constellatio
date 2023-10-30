import { Input } from "@/components/atoms/Input/Input";
import { PasswordValidationSchema } from "@/components/helpers/PasswordValidationSchema";

import { Box, type TextInputProps } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { type FunctionComponent } from "react";

type Props = {
  readonly confirmPasswordInputProps: TextInputProps;
  readonly passwordConfirmLabelOverride?: string;
  readonly passwordInputProps: TextInputProps;
  readonly passwordLabelOverride?: string;
  readonly passwordToValidate: string;
};

const PasswordInput: FunctionComponent<Props> = ({
  confirmPasswordInputProps,
  passwordConfirmLabelOverride,
  passwordInputProps,
  passwordLabelOverride,
  passwordToValidate
}) =>
{
  const [isPasswordRevealed, { toggle }] = useDisclosure(false);

  return (
    <>
      <Box>
        <Input
          {...passwordInputProps}
          inputType="password"
          label={passwordLabelOverride ?? "Passwort*"}
          title="Passwort"
          placeholder={"*".repeat(16)}
          onVisibilityChange={toggle}
        />
        <PasswordValidationSchema
          passwordValue={passwordToValidate}
          isPasswordRevealed={isPasswordRevealed}
        />
      </Box>
      <Input
        {...confirmPasswordInputProps}
        inputType="password"
        label={passwordConfirmLabelOverride ?? "Passwort bestätigen*"}
        placeholder={"*".repeat(16)}
        title="Passwort bestätigen"
        onVisibilityChange={toggle}
      />
    </>
  );
};

export default PasswordInput;
