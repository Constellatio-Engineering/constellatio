import { CheckFilled } from "@/components/Icons/CheckFilled";
import { CrossFilled } from "@/components/Icons/CrossFilled";

import { TextInput, type TextInputProps } from "@mantine/core";
import React, { type ForwardRefRenderFunction, ReactNode, forwardRef } from "react";

import { fillGapInputStyles } from "./FillGapInput.styles";

type TFillGapInput = TextInputProps & {
  readonly index?: number;
  readonly status: "default" | "success" | "error";
};

const _FillGapInput: ForwardRefRenderFunction<HTMLInputElement, TFillGapInput> = ({
  index,
  status,
  ...props
}, ref) => 
{
  return (
    <TextInput
      ref={ref}
      styles={fillGapInputStyles({ index, status })}
      rightSection={status === "success" ? <CheckFilled size={16}/> : status === "error" ? <CrossFilled size={16}/> : null}
      disabled={status !== "default"}
      {...props}
    />
  );
};

export const FillGapInput = forwardRef(_FillGapInput);
