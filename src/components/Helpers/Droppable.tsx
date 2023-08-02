import { useDroppable } from "@dnd-kit/core";
import React, { ReactNode } from "react";

export const Droppable = ({ children }: { children: ReactNode }) => {
  const { setNodeRef } = useDroppable({
    id: "droppable",
  });

  return (
    <div ref={setNodeRef} className="droppable-area">
      {children}
    </div>
  );
};
