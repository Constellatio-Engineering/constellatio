import React, { ButtonHTMLAttributes, CSSProperties, FC, ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";
import { ButtonCard, StatusWrapper } from "./DraggableCard.styles";
import { BodyText } from "../BodyText/BodyText";
import { Handle } from "@/components/Icons/Handle";
import { CSS } from "@dnd-kit/utilities";
import { CheckFilled } from "@/components/Icons/CheckFilled";
import { CrossFilled } from "@/components/Icons/CrossFilled";
import { Flex } from "@mantine/core";
import { Cross } from "@/components/Icons/Cross";

type TDraggableCard = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: ReactNode;
  id: string;
  status: "default" | "success" | "error";
  dropped?: boolean;
  onDeleteClickHandler?: React.MouseEventHandler<HTMLDivElement>;
};

export const DraggableCard: FC<TDraggableCard> = ({ onDeleteClickHandler, dropped, label, id, status, ...props }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <ButtonCard
      style={style}
      ref={setNodeRef}
      status={status}
      isDragging={isDragging}
      {...attributes}
      {...listeners}
      {...props}
    >
      <Flex gap={"spacing-8"}>
        {status === "success" ? <CheckFilled /> : status === "error" ? <CrossFilled /> : <Handle />}
        <BodyText styleType="body-01-regular" c={"neutrals-02.1"}>
          {label}
        </BodyText>
      </Flex>
      <StatusWrapper dropped={dropped} status={status} onClick={onDeleteClickHandler}>
        <Cross />
      </StatusWrapper>
    </ButtonCard>
  );
};
