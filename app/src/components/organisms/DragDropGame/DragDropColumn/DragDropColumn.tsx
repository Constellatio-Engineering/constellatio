import { DragNDropCard } from "@/components/molecules/DraggableCard/DragNDropCard";
import { ColumnWrapper } from "@/components/organisms/DragDropGame/Column/ColumnWrapper";
import useDragDropGameStore, { type TDragAndDropGameOptionType } from "@/stores/dragDropGame.store";

import {
  Draggable, type DraggableProvided, type DraggableStateSnapshot, Droppable, type DroppableProvided, type DroppableStateSnapshot 
} from "@hello-pangea/dnd";
import React, { type FunctionComponent } from "react";

import * as styles from "./DragDropColumn.styles";

type Props = {
  readonly columnType: "options" | "dropped";
  readonly gameId: string;
  readonly isDraggingOverEnabled: boolean;
  readonly isDropDisabled: boolean;
  readonly items: TDragAndDropGameOptionType[];
};

export const DragDropColumn: FunctionComponent<Props> = ({
  columnType,
  gameId,
  isDraggingOverEnabled,
  isDropDisabled,
  items
}) =>
{
  const removeItemFromSubmitted = (sourceIndex: number): void =>
  {
    const { moveItem } = useDragDropGameStore.getState();

    moveItem({
      gameId,
      itemSourceIndex: sourceIndex,
      newPositionIndex: null,
      to: "optionsItems"
    });
  };

  return (
    <Droppable
      droppableId={columnType}
      type={"dndGameColumn"}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={false}>
      {(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => (
        <ColumnWrapper
          {...dropProvided.droppableProps}
          isDraggingOver={isDraggingOverEnabled ? dropSnapshot.isDraggingOver : false}
          dropProvided={dropProvided}
          isEmpty={items.length === 0}
          columType={columnType}>
          {items.map((optionItem, index) => (
            <Draggable key={optionItem.id} draggableId={optionItem.id} index={index}>
              {(dragProvided: DraggableProvided, dragSnapshot: DraggableStateSnapshot) => (
                <DragNDropCard
                  dropped={columnType === "dropped"}
                  status={"default"}
                  label={optionItem.label}
                  id={optionItem.id}
                  index={index}
                  key={optionItem.id}
                  onDeleteHandler={columnType === "dropped" ? () => removeItemFromSubmitted(index) : undefined}
                  isDragging={dragSnapshot.isDragging}
                  provided={dragProvided}
                />
              )}
            </Draggable>
          ))}
          {dropProvided.placeholder}
        </ColumnWrapper>
      )}
    </Droppable>
  );
};
