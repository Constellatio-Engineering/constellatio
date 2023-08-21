import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import React, { FC, ReactNode, useState } from "react";
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { CheckFilled } from "@/components/Icons/CheckFilled";
import { CrossFilled } from "@/components/Icons/CrossFilled";
import { useMantineTheme } from "@mantine/core";
import { ResultWrapper } from "./SelectionCard.styles";

type TSelectionCard = {
  label: ReactNode | null;
  status: "default" | "success" | "error";
  onCheckHandler: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  result?: ReactNode;
};

export const SelectionCard: FC<TSelectionCard> = ({ onCheckHandler, status, label, disabled, result }) => {
  const [checked, setChecked] = useState(false);
  const theme = useMantineTheme();

  return (
    <Checkbox
      fullWidth
      checked={checked}
      onChange={(e) => {
        setChecked(e.target.checked);
        onCheckHandler(e);
      }}
      disabled={disabled}
      label={
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
            {status === "success" ? <CheckFilled /> : status === "error" ? <CrossFilled /> : null}
          </ResultWrapper>
        </>
      }
      checkboxBodyOverride={{
        alignItems: "center",
        gap: theme.spacing["spacing-8"],
        borderRadius: theme.radius["radius-8"],
        padding: `0 ${theme.spacing["spacing-12"]}`,
        border: `1px solid ${
          checked
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
        backgroundColor: theme.colors["neutrals-01"][0],
        transition: "all 0.3s ease",

        ".mantine-Checkbox-inner": {
          input: {
            borderColor: checked
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

            backgroundColor: `${theme.colors["neutrals-01"][0]} !important`,

            "&:hover": {
              borderColor: !checked && status === "default" ? theme.colors["neutrals-01"][5] : "",
            },
          },
          svg: {
            color: checked
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

        "&:hover": {
          borderColor: status === "default" ? theme.colors["neutrals-01"][4] : "",
          backgroundColor: status === "default" ? theme.colors["neutrals-01"][1] : "",
        },
      }}
      checkboxLabelOverride={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: status === "default" ? "pointer" : "default",
        color: `${theme.colors["neutrals-02"][1]} !important`,
        padding: `${theme.spacing["spacing-12"]} 0`,
      }}
    />
  );
};
