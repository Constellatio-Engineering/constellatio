import { DragNDropCard, type TDraggableCard } from "@/components/molecules/DraggableCard/DragNDropCard";
import { ColumnWrapper } from "@/components/organisms/DragDropGame/Column/ColumnWrapper";
import useDragDropGameStore, { type GameStatus, type TDragAndDropGameOptionType } from "@/stores/dragDropGame.store";

import {
  Draggable, type DraggableProvided, type DraggableStateSnapshot, Droppable, type DroppableProvided, type DroppableStateSnapshot 
} from "@hello-pangea/dnd";
import React, { type FunctionComponent } from "react";

type Props = {
  readonly columnType: "options" | "dropped";
  readonly gameId: string;
  readonly gameStatus: GameStatus;
  readonly isDraggingOverEnabled: boolean;
  readonly isDropDisabled: boolean;
  readonly items: TDragAndDropGameOptionType[];
};

export const DragDropColumn: FunctionComponent<Props> = ({
  columnType,
  gameId,
  gameStatus,
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
            <Draggable
              key={optionItem.id}
              draggableId={optionItem.id}
              index={index}
              isDragDisabled={gameStatus !== "inprogress"}>
              {(dragProvided: DraggableProvided, dragSnapshot: DraggableStateSnapshot) =>
              {
                let status: TDraggableCard["status"];
                let isWrongOrder: boolean = false;
                // let result: TDraggableCard["result"];

                if(gameStatus === "inprogress")
                {
                  status = "default";
                  // result = null;
                }
                else
                {
                  status = optionItem.correctAnswer ? "success" : "error";
                  isWrongOrder = gameStatus === "lose-wrong-order" && columnType === "dropped" && status === "success" && optionItem.originalIndex !== index;
                  // result = optionItem.correctAnswer ? "Richtig" : "Falsch";
                }

                return (
                  <DragNDropCard
                    dropped={columnType === "dropped"}
                    status={status}
                    // result={result}
                    label={optionItem.label}
                    id={optionItem.id}
                    isWrongOrder={isWrongOrder}
                    index={index}
                    key={optionItem.id}
                    onDeleteHandler={columnType === "dropped" ? () => removeItemFromSubmitted(index) : undefined}
                    isDragging={dragSnapshot.isDragging}
                    provided={dragProvided}
                  />
                );
              }}
            </Draggable>
          ))}
          {dropProvided.placeholder}
        </ColumnWrapper>
      )}
    </Droppable>
  );
};
