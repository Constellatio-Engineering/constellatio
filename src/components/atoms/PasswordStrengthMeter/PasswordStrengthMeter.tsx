import { Check } from "@/components/Icons/Check";
import { Cross } from "@/components/Icons/Cross";
import { Box, Text } from "@mantine/core";
import React, { FC, ReactNode } from "react";
import { styles } from "./PasswordStrengthMeter.styles";

type TPasswordStrengthMeter = {
  meets: boolean;
  label: string;
  isPasswordRevealed: boolean;
  error?: ReactNode;
  disabled?: boolean;
};

export const PasswordStrengthMeter: FC<TPasswordStrengthMeter> = ({ meets, label, isPasswordRevealed, error, disabled }) => {
  return (
    <Text sx={styles({ isPasswordRevealed, meets, error, disabled })} size="sm">
      {meets ? <Check /> : <Cross />} <Box ml={"spacing-4"}>{label}</Box>
    </Text>
  );
};
