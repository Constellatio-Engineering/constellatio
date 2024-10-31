import { CheckFilled } from "@/components/Icons/CheckFilled";
import { CrossFilled } from "@/components/Icons/CrossFilled";

import { TextInput, type TextInputProps } from "@mantine/core";
import { forwardRef, type ForwardRefRenderFunction } from "react";

import { fillGapInputStyles } from "./FillGapInput.styles";

export type FillGapInputProps = TextInputProps & {
  readonly correctAnswerLength?: number;
  readonly index?: number;
  readonly status: "default" | "success" | "error";
};

const _FillGapInput: ForwardRefRenderFunction<HTMLInputElement, FillGapInputProps> = ({
  correctAnswerLength,
  index,
  status,
  ...props
}, ref) => 
{
  return (
    <TextInput
      ref={ref}
      width={200}
      styles={fillGapInputStyles({
        index,
        status,
        width: !correctAnswerLength ? undefined : correctAnswerLength * 12 + (status === "default" ? 0 : 16),
      })}
      rightSection={status === "success" ? <CheckFilled size={16}/> : status === "error" ? <CrossFilled size={16}/> : null}
      disabled={status !== "default"}
      {...props}
    />
  );
};

export const FillGapInput = forwardRef(_FillGapInput);
