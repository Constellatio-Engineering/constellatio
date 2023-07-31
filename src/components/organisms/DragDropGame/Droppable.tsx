import { useDroppable } from "@dnd-kit/core";
import React, { ReactNode } from "react";

export const Droppable = ({ children }: { children: ReactNode }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div style={style} ref={setNodeRef} className="droppable-area">
      {children}
    </div>
  );
};
