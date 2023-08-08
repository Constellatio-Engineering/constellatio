import { TextInput, TextInputProps } from "@mantine/core";
import React, { FC, ReactNode } from "react";
import { fillGapInputStyles } from "./FillGapInput.styles";
import { CheckFilled } from "@/components/Icons/CheckFilled";
import { CrossFilled } from "@/components/Icons/CrossFilled";
import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";

type TFillGapInput = TextInputProps & {
  status: "default" | "success" | "error";
  hint: ReactNode;
};

export const FillGapInput: FC<TFillGapInput> = ({ hint, status, ...props }) => {
  return (
    <TextInput
      styles={fillGapInputStyles({ status })}
      rightSection={
        status === "success" ? <CheckFilled size={16} /> : status === "error" ? <CrossFilled size={16} /> : null
      }
      disabled={status !== "default"}
      description={
        status === "error" ? (
          <CaptionText styleType="caption-01-medium" component="p" tt="uppercase">
            {hint}
          </CaptionText>
        ) : null
      }
      {...props}
    />
  );
};
