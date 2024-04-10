import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { DragAndDropGameIcon } from "@/components/Icons/DragAndDropGameIcon";

import type { DroppableProvided } from "@hello-pangea/dnd";
import React, { type FunctionComponent, type ComponentProps } from "react";

import * as styles from "./Column.styles";

type Props = ComponentProps<"div"> & {
  readonly columType: "options" | "dropped";
  readonly dropProvided: DroppableProvided;
  readonly isDraggingOver: boolean;
  readonly isEmpty: boolean;
};

export const Column: FunctionComponent<Props> = ({
  children,
  columType,
  dropProvided,
  isDraggingOver,
  isEmpty,
  ...props
}) =>
{
  return (
    <styles.Column {...props} isDraggingOver={isDraggingOver}>
      <div
        css={[(columType === "dropped") && styles.InnerWrapperWithBackground]}
        ref={dropProvided.innerRef}
        style={{ height: "100%" }}>
        {(columType === "dropped" && isEmpty && !isDraggingOver) ? (
          <styles.EmptyPlaceholder>
            <DragAndDropGameIcon size={140}/>
            <BodyText
              component="p"
              align="center"
              styleType="body-02-medium">
              Ziehe die richtigen Antworten in dieses Feld
            </BodyText>
          </styles.EmptyPlaceholder>
        ) : children}
      </div>
    </styles.Column>
  );
};
