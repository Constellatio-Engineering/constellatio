import { passwordRequirements } from "@/schemas/RegistrationFormSchema";

import { Stack } from "@mantine/core";
import React, { type FC } from "react";

import { PasswordStrengthMeter } from "../atoms/PasswordStrengthMeter/PasswordStrengthMeter";

interface TPasswordValidationSchema 
{
  readonly isPasswordRevealed?: boolean ;
  readonly passwordValue?: string;
}

export const PasswordValidationSchema: FC<TPasswordValidationSchema> = ({ isPasswordRevealed, passwordValue = "" }) =>
{
  return (
    <Stack spacing="spacing-8" mt="spacing-12" pb="spacing-16">
      {passwordRequirements.map((requirement, index) => (
        <PasswordStrengthMeter
          key={index}
          label={requirement.label}
          meets={requirement.re.test(passwordValue)}
          isPasswordRevealed={isPasswordRevealed ?? false}
        />
      ))}
    </Stack>
  );
};
