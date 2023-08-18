import { TextInput, TextInputProps } from "@mantine/core";
import React, { ForwardRefRenderFunction, ReactNode, forwardRef } from "react";
import { fillGapInputStyles } from "./FillGapInput.styles";
import { CheckFilled } from "@/components/Icons/CheckFilled";
import { CrossFilled } from "@/components/Icons/CrossFilled";

type TFillGapInput = TextInputProps & {
  status: "default" | "success" | "error";
  index?: number;
};

const _FillGapInput: ForwardRefRenderFunction<HTMLInputElement, TFillGapInput> = ({ index, status, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      styles={fillGapInputStyles({ status, index })}
      rightSection={
        status === "success" ? <CheckFilled size={16} /> : status === "error" ? <CrossFilled size={16} /> : null
      }
      disabled={status !== "default"}
      {...props}
    />
  );
};

export const FillGapInput = forwardRef(_FillGapInput);
