import { Stack } from "@mantine/core";
import React, { type FC } from "react";

import { PasswordStrengthMeter } from "../atoms/PasswordStrengthMeter/PasswordStrengthMeter";

interface TPasswordValidationSchema 
{
  readonly isPasswordRevealed?: boolean ;
  readonly passwordValue: string;
}

export const PasswordValidationSchema: FC<TPasswordValidationSchema> = ({ isPasswordRevealed, passwordValue }) => 
{
  const requirements = [
    { label: "At least 8 characters", re: /.{8,}/ },
    { label: "At least 1 number", re: /[0-9]/ },
    { label: "At least 1 capital letter", re: /[A-Z]/ },
    { label: "At least 1 lowercase letter", re: /[a-z]/ },
    {
      label: "At least 1 special character: ! # $ & ( ) * + - = . , / ? @ { } [ ] ^ _ ~",
      // eslint-disable-next-line no-useless-escape
      re: /[!#$&()*+,-.=\/?@{}\[\]^_~]/,
    },
  ];

  return (
    <Stack spacing="spacing-8" mt="spacing-12" pb="spacing-16">
      {requirements.map((requirement, index) => (
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
