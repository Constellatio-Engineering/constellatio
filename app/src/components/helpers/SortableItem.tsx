import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { type FunctionComponent, type ReactNode } from "react";

type SortableItemProps = {
  readonly children: ReactNode;
  readonly id: string;
};

export const SortableItem: FunctionComponent<SortableItemProps> = ({ children, id }) =>
{
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, cursor: isDragging ? "grabbing" : "grab", width: "100%" }}
      {...listeners}
      {...attributes}>
      {children}
    </div>
  );
};
