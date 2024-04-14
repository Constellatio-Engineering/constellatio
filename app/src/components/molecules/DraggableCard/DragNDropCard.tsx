// import { CheckFilled } from "@/components/Icons/CheckFilled";
import { Cross } from "@/components/Icons/Cross";
// import { CrossFilled } from "@/components/Icons/CrossFilled";
import { Handle } from "@/components/Icons/Handle";
import { ReorderIcon } from "@/components/Icons/Reorder";
import { WarningIcon } from "@/components/Icons/Warning";

import type { DraggableProvided } from "@hello-pangea/dnd";
import { Flex, Tooltip } from "@mantine/core";
import React, { type ComponentProps, type FC, type ReactNode } from "react";
 
import { Card, ResultWrapper, StatusWrapper, WarningWrapper } from "./DragNDropCard.styles";
import { BodyText } from "../../atoms/BodyText/BodyText";

export type TDraggableCard = ComponentProps<"div"> & {
  readonly dropped: boolean;
  readonly id: string;
  readonly index: number;
  readonly isDragging: boolean;
  readonly isWrongOrder?: boolean;
  readonly label: ReactNode;
  readonly onDeleteHandler?: React.MouseEventHandler<HTMLDivElement>;
  readonly provided: DraggableProvided;
  readonly result?: ReactNode;
  readonly status: "default" | "success" | "error";
};

export const DragNDropCard: FC<TDraggableCard> = ({
  dropped,
  id,
  index,
  isDragging,
  isWrongOrder,
  label,
  onDeleteHandler,
  provided,
  result,
  status,
  ...props
}) => 
{
  return (
    <Card
      {...props}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={provided.draggableProps.style}
      data-is-dragging={isDragging}
      data-index={index}
      status={status}
      dropped={dropped}>
      <Flex gap="spacing-2" align="center">
        {status === "default" && (
          <Handle/>
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
        {isWrongOrder && (
          <Tooltip
            label={"Falsche Reihenfolge"}
            withArrow
            offset={-4}
            position={"top"}>
            <WarningWrapper>
              <WarningIcon size={18}/>
              <ReorderIcon size={18}/>
            </WarningWrapper>
          </Tooltip>
        )}
        {/* {status === "success" ? <CheckFilled/> : status === "error" ? <CrossFilled/> : null}*/}
      </ResultWrapper>
    </Card>
  );
};
