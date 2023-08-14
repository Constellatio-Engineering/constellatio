import React, { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { ButtonCard, StatusWrapper } from "./DragNDropCard.styles";
import { BodyText } from "../../atoms/BodyText/BodyText";
import { Handle } from "@/components/Icons/Handle";
import { CheckFilled } from "@/components/Icons/CheckFilled";
import { CrossFilled } from "@/components/Icons/CrossFilled";
import { Flex } from "@mantine/core";
import { Cross } from "@/components/Icons/Cross";

type TDraggableCard = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: ReactNode;
  status: "default" | "success" | "error";
  dropped?: boolean;
  onDeleteHandler?: React.MouseEventHandler<HTMLDivElement>;
  showIcon?: boolean;
};

export const DragNDropCard: FC<TDraggableCard> = ({ onDeleteHandler, dropped, label, status, showIcon, ...props }) => {
  return (
    <ButtonCard status={status} {...props}>
      <Flex gap={"spacing-8"} align="center">
        {status === "success" && showIcon ? (
          <CheckFilled />
        ) : status === "error" && showIcon ? (
          <CrossFilled />
        ) : (
          <Handle />
        )}

        <BodyText styleType="body-01-regular" c={"neutrals-02.1"} component="p">
          {label}
        </BodyText>
      </Flex>
      <StatusWrapper dropped={dropped} status={status} onClick={onDeleteHandler}>
        <Cross />
      </StatusWrapper>
    </ButtonCard>
  );
};
