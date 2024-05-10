import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";

import { useMantineTheme } from "@mantine/core";
import React, { type FC, type ReactNode } from "react";

import { ResultWrapper } from "./SelectionCard.styles";

export interface SelectionCardProps
{
  readonly disabled?: boolean;
  readonly isChecked: boolean;
  readonly label: ReactNode | null;
  readonly onCheckHandler: React.ChangeEventHandler<HTMLInputElement>;
  readonly result?: ReactNode;
  readonly status: "default" | "success" | "error";
}

export const SelectionCard: FC<SelectionCardProps> = ({
  disabled,
  isChecked,
  label,
  onCheckHandler,
  result,
  status
}) => 
{
  const theme = useMantineTheme();

  return (
    <Checkbox
      fullWidth
      checked={isChecked}
      onChange={onCheckHandler}
      disabled={disabled}
      label={(
        <>
          <BodyText styleType="body-01-regular" component="p">
            {label}
          </BodyText>
          <ResultWrapper status={status}>
            {result && (
              <BodyText styleType="body-01-regular" component="p">
                {result}
              </BodyText>
            )}
            {/* {status === "success" ? <CheckFilled/> : status === "error" ? <CrossFilled/> : null}*/}
          </ResultWrapper>
        </>
      )}
      checkboxBodyOverride={{
        "&:hover": {
          backgroundColor: status === "default" ? theme.colors["neutrals-01"][1] : "",
          borderColor: status === "default" ? theme.colors["neutrals-01"][4] : "",
        },
        ".mantine-Checkbox-inner": {
          input: {
            "&:hover": {
              borderColor: !isChecked && status === "default" ? theme.colors["neutrals-01"][5] : "",
            },

            backgroundColor: `${theme.colors["neutrals-01"][0]} !important`,

            borderColor: isChecked
              ? status === "default"
                ? theme.colors["neutrals-02"][1]
                : status === "success"
                  ? theme.colors["support-success"][4]
                  : status === "error"
                    ? theme.colors["support-error"][3]
                    : ""
              : status === "success"
                ? theme.colors["support-error"][3]
                : theme.colors["neutrals-01"][5],
          },
          svg: {
            color: isChecked
              ? status === "default"
                ? `${theme.colors["neutrals-02"][1]} !important`
                : status === "success"
                  ? `${theme.colors["support-success"][4]} !important`
                  : status === "error"
                    ? `${theme.colors["support-error"][3]} !important`
                    : ""
              : "",
          },
        },
        alignItems: "center",
        backgroundColor: theme.colors["neutrals-01"][0],
        border: `1px solid ${
          isChecked
            ? status === "default"
              ? theme.colors["neutrals-02"][1]
              : status === "success"
                ? theme.colors["support-success"][4]
                : status === "error"
                  ? theme.colors["support-error"][3]
                  : ""
            : status === "success"
              ? theme.colors["support-error"][3]
              : theme.colors["neutrals-01"][3]
        }`,
        borderRadius: theme.radius["radius-8"],
        gap: theme.spacing["spacing-8"],

        padding: `0 ${theme.spacing["spacing-12"]}`,

        transition: "all 0.3s ease",
      }}
      checkboxLabelOverride={{
        alignItems: "center",
        color: `${theme.colors["neutrals-02"][1]} !important`,
        cursor: status === "default" ? "pointer" : "default",
        display: "flex",
        justifyContent: "space-between",
        padding: `${theme.spacing["spacing-12"]} 0`,
      }}
    />
  );
};
