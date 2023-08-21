import { Check } from "@/components/Icons/Check";
import { Cross } from "@/components/Icons/Cross";

import { Box, Text } from "@mantine/core";
import React, { type FC, type ReactNode } from "react";

import { styles } from "./PasswordStrengthMeter.styles";

interface TPasswordStrengthMeter 
{
  readonly disabled?: boolean;
  readonly error?: ReactNode;
  readonly isPasswordRevealed: boolean;
  readonly label: string;
  readonly meets: boolean;
}

export const PasswordStrengthMeter: FC<TPasswordStrengthMeter> = ({
  disabled,
  error,
  isPasswordRevealed,
  label,
  meets
}) => 
{
  return (
    <Text
      sx={styles({
        disabled, error, isPasswordRevealed, meets 
      })}
      size="sm">
      {meets ? <Check/> : <Cross/>} <Box ml="spacing-4">{label}</Box>
    </Text>
  );
};
