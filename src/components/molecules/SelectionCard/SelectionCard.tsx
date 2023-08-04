import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import React, { FC, ReactNode, useState } from "react";
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { CheckFilled } from "@/components/Icons/CheckFilled";
import { CrossFilled } from "@/components/Icons/CrossFilled";
import { Box, useMantineTheme } from "@mantine/core";
import { IconWrapper } from "./SelectionCard.styles";

type TSelectionCard = {
  label: ReactNode | null;
  status: "default" | "success" | "error";
  onCheckHandler: React.ChangeEventHandler<HTMLInputElement>;
};

export const SelectionCard: FC<TSelectionCard> = ({ onCheckHandler, status, label }) => {
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
      disabled={status !== "default"}
      label={
        <>
          <BodyText styleType="body-01-regular" component="p">
            {label}
          </BodyText>
          {status !== "default" && checked && (
            <IconWrapper status={status}>{status === "success" ? <CheckFilled /> : <CrossFilled />}</IconWrapper>
          )}
        </>
      }
      checkboxBodyOverride={{
        alignItems: "center",
        width: 320,
        padding: theme.spacing["spacing-12"],
        gap: theme.spacing["spacing-4"],
        borderRadius: theme.radius["radius-8"],
        border: `1px solid ${
          checked && status === "default"
            ? theme.colors["neutrals-02"][1]
            : status === "success"
            ? theme.colors["support-success"][4]
            : status === "error"
            ? theme.colors["support-error"][3]
            : theme.colors["neutrals-01"][3]
        }`,
        backgroundColor: theme.colors["neutrals-01"][0],
        transition: "all 0.3s ease",

        ".mantine-Checkbox-inner": {
          input: {
            borderColor:
              checked && status === "default" ? theme.colors["neutrals-02"][1] : theme.colors["neutrals-01"][5],
            "&:hover": {
              borderColor: theme.colors["neutrals-01"][5],
            },
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
      }}
    />
  );
};
