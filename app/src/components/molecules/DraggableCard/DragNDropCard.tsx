import { CheckFilled } from "@/components/Icons/CheckFilled";
import { Cross } from "@/components/Icons/Cross";
import { CrossFilled } from "@/components/Icons/CrossFilled";
import { Handle } from "@/components/Icons/Handle";

import { Flex } from "@mantine/core";
import React, { type ButtonHTMLAttributes, type FC, type ReactNode } from "react";

import { ButtonCard, ResultWrapper, StatusWrapper } from "./DragNDropCard.styles";
import { BodyText } from "../../atoms/BodyText/BodyText";

export type TDraggableCard = ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly dropped?: boolean;
  readonly label: ReactNode;
  readonly onDeleteHandler?: React.MouseEventHandler<HTMLDivElement>;
  readonly result?: ReactNode;
  readonly status: "default" | "success" | "error";
};

export const DragNDropCard: FC<TDraggableCard> = ({
  dropped,
  label,
  onDeleteHandler,
  result,
  status,
  ...props
}) => 
{
  return (
    <ButtonCard status={status} dropped={dropped} {...props}>
      <Flex gap="spacing-2" align="center">
        {status === "default" && (
          <div>
            <Handle/>
          </div>
        )}
        <BodyText
          styleType="body-01-regular"
          c="neutrals-02.1"
          component="p"
          ta="left">
          {label}
        </BodyText>
      </Flex>
      <StatusWrapper dropped={dropped} status={status} onClick={onDeleteHandler}>
        <Cross/>
      </StatusWrapper>
      <ResultWrapper status={status}>
        {result && <BodyText styleType="body-01-regular" component="p">{result}</BodyText>}
        {status === "success" ? <CheckFilled/> : status === "error" ? <CrossFilled/> : null}
      </ResultWrapper>
    </ButtonCard>
  );
};
