import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useTheme } from "@emotion/react";
import { Box } from "@mantine/core";
import { type FunctionComponent, type ReactNode } from "react";

type DraggableProps = {
  readonly children: ReactNode;
  readonly id: string;
};

export const Draggable: FunctionComponent<DraggableProps> = ({ children, id }) =>
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
