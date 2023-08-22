import { useDroppable } from "@dnd-kit/core";
import React, { type ReactNode } from "react";

export const Droppable = ({ children }: { readonly children: ReactNode }) => 
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
