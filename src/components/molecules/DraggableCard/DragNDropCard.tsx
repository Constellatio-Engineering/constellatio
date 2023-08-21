import React, { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { ButtonCard, ResultWrapper, StatusWrapper } from "./DragNDropCard.styles";
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
  result?: ReactNode;
};

export const DragNDropCard: FC<TDraggableCard> = ({
  onDeleteHandler,
  dropped,
  label,
  status,
  showIcon,
  result,
  ...props
}) => {
  return (
    <ButtonCard status={status} dropped={dropped} {...props}>
      <Flex gap={"spacing-8"} align="center">
        {status === "default" && (
          <div>
            <Handle />
          </div>
        )}
        <BodyText styleType="body-01-regular" c={"neutrals-02.1"} component="p" ta={"left"}>
          {label}
        </BodyText>
      </Flex>
      <StatusWrapper dropped={dropped} status={status} onClick={onDeleteHandler}>
        <Cross />
      </StatusWrapper>
      <ResultWrapper status={status}>
        {result && <BodyText styleType="body-01-regular" component="p">{result}</BodyText>}
        {status === "success" ? <CheckFilled /> : status === "error" ? <CrossFilled /> : null}
      </ResultWrapper>
    </ButtonCard>
  );
};
