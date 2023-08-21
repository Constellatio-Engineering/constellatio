import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useTheme } from "@emotion/react";
import { Box } from "@mantine/core";
import React, { type ReactNode } from "react";

export const Draggable = ({ children, id }: { readonly children: ReactNode; readonly id: string }) => 
{
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform
  } = useDraggable({
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
        "> button": {
          cursor: isDragging ? "grabbing" : "grab",
        },
        boxShadow: isDragging ? theme.shadows["elevation-big"] : "",
      }}
      ref={setNodeRef}>
      {children}
    </Box>
  );
};
