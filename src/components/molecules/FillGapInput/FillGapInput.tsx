import { TextInput, TextInputProps, createPolymorphicComponent } from "@mantine/core";
import React, { FC, ForwardRefRenderFunction, ReactNode, forwardRef } from "react";
import { fillGapInputStyles } from "./FillGapInput.styles";
import { CheckFilled } from "@/components/Icons/CheckFilled";
import { CrossFilled } from "@/components/Icons/CrossFilled";
import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";

type TFillGapInput = TextInputProps & {
  status: "default" | "success" | "error";
  hint?: ReactNode;
};

const _FillGapInput: ForwardRefRenderFunction<HTMLInputElement, TFillGapInput> = ({ hint, status, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      styles={fillGapInputStyles({ status })}
      rightSection={
        status === "success" ? <CheckFilled size={16} /> : status === "error" ? <CrossFilled size={16} /> : null
      }
      disabled={status !== "default"}
      description={
        status === "error" &&
        hint && (
          <CaptionText styleType="caption-01-medium" component="p" tt="uppercase">
            {hint}
          </CaptionText>
        )
      }
      {...props}
    />
  );
};

export const FillGapInput = forwardRef(_FillGapInput);
