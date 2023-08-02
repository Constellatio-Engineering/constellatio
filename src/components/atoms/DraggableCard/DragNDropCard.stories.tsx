import { Meta, StoryObj } from "@storybook/react";
import { Box, Flex } from "@mantine/core";
import { DndContext, useDroppable, DragOverlay } from "@dnd-kit/core";
import { DragNDropCard } from "./DragNDropCard";
import { ReactNode, useState } from "react";
import { set, z } from "zod";
import { RadioUnselected } from "@/components/Icons/RadioUnselected";
import { Draggable } from "@/components/Helpers/Draggable";

const Droppable = ({ children }: { children: ReactNode }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <Box w={350} h={150} sx={{ border: "1px solid red" }} p={20} m="0 auto" ref={setNodeRef} style={style}>
      {children}
    </Box>
  );
};

const Template = (args: any) => {
  const [isDropped, setIsDropped] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const draggableMarkup = (
    <Draggable id="draggable">
      <DragNDropCard {...args} />
    </Draggable>
  );

  const handleDragEnd = (event) => {
    setActiveId(null);
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    } else {
      setIsDropped(false);
    }
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <Flex
        direction={"column"}
        gap={"20px"}
        sx={{
          ".drag-overlay": {
            // display: "none",
            opacity: 0.5,
          },
        }}
      >
        <Droppable>{isDropped ? "Drop Here" : draggableMarkup}</Droppable>
        <Droppable>{isDropped ? draggableMarkup : "Drop Here Too"}</Droppable>
        <DragOverlay
          className="drag-overlay"
          style={{
            transform: "translate3d(0, 0, 0)",
            zIndex: 1,
          }}
        >
          {activeId ? <DragNDropCard {...args} icon={<RadioUnselected />} label="OVERLAY" /> : null}
        </DragOverlay>
      </Flex>
    </DndContext>
  );
};

const meta: Meta = {
  title: "Atoms/Gamification/DragNDropCard",
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=50-3627&mode=dev",
    },
  },
  argTypes: {
    status: {
      control: "radio",
      options: ["default", "success", "error"],
    },
    dropped: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof DragNDropCard>;

export const Default: Story = {
  args: {
    label: "Draggable Card",
    status: "default",
  },
};
