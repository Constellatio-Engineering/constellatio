import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useTheme } from "@emotion/react";
import { Box } from "@mantine/core";
import React, { ReactNode } from "react";

export const Draggable = ({ id, children }: { id: string; children: ReactNode }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const theme = useTheme();

  return (
    <Box
      {...attributes}
      {...listeners}
      sx={{
        ...style,
        boxShadow: isDragging ? theme.shadows["elevation-big"] : "",
        "> button": {
          cursor: isDragging ? "grabbing" : "grab",
        },
      }}
      ref={setNodeRef}
    >
      {children}
    </Box>
  );
};
