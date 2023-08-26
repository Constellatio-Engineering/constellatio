import { useDroppable } from "@dnd-kit/core";
import React, { type FunctionComponent, type ReactNode } from "react";

type DroppableProps = {
  readonly children: ReactNode;
};

export const Droppable: FunctionComponent<DroppableProps> = ({ children }) =>
{
  const { setNodeRef } = useDroppable({
    id: "droppable",
  });

  return (
    <div ref={setNodeRef} className="droppable-area">
      {children}
    </div>
  );
};
