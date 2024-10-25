import { Input } from "@/components/atoms/Input/Input";
import { minimumPasswordLength } from "@/schemas/auth/userData.validation";

import { Box, type TextInputProps } from "@mantine/core";
import React, { type FunctionComponent } from "react";
import PasswordStrengthBar from "react-password-strength-bar";

type Props = {
  readonly confirmPassword: TextInputProps | false;
  readonly passwordConfirmLabelOverride?: string;
  readonly passwordInputProps: TextInputProps;
  readonly passwordLabelOverride?: string;
  readonly passwordToValidate: string;
};

const PasswordInput: FunctionComponent<Props> = ({
  confirmPassword,
  passwordConfirmLabelOverride,
  passwordInputProps,
  passwordLabelOverride,
  passwordToValidate,
}) =>
{
  return (
    <>
      <Box>
        <Input
          {...passwordInputProps}
          inputType="password"
          label={passwordLabelOverride ?? "Passwort*"}
          title="Passwort"
          placeholder={"*".repeat(16)}
        />
        <PasswordStrengthBar
          password={passwordToValidate}
          shortScoreWord="Zu kurz"
          minLength={minimumPasswordLength}
          scoreWords={["Schwach", "Okay", "Gut", "Stark", "Sehr stark"]}
        />
        {/* <PasswordValidationSchema
          passwordValue={passwordToValidate}
          isPasswordRevealed={isPasswordRevealed}
        />*/}
      </Box>
      {confirmPassword && (
        <Input
          {...confirmPassword}
          inputType="password"
          mt={-8}
          label={passwordConfirmLabelOverride ?? "Passwort bestätigen*"}
          placeholder={"*".repeat(16)}
          title="Passwort bestätigen"
        />
      )}
    </>
  );
};

export default PasswordInput;
