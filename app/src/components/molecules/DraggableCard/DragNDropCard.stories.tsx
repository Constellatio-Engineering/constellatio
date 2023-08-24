/* eslint-disable react/no-multi-comp */
import { Draggable } from "@/components/helpers/Draggable";

import {
  DndContext, useDroppable, DragOverlay, type DragEndEvent, type DragStartEvent 
} from "@dnd-kit/core";
import { Box, Flex } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type ReactNode, useState, type FC } from "react";

import { DragNDropCard, type TDraggableCard } from "./DragNDropCard";

const Droppable: FC<{ readonly children: ReactNode }> = ({ children }) => 
{
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <Box
      w={350}
      h={150}
      sx={{ border: "1px solid red" }}
      p={20}
      m="0 auto"
      ref={setNodeRef}
      style={style}>
      {children}
    </Box>
  );
};

const Template: FC<TDraggableCard> = (args) => 
{
  const [isDropped, setIsDropped] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const draggableMarkup = (
    <Draggable id="draggable">
      <DragNDropCard {...args}/>
    </Draggable>
  );

  const handleDragEnd = (event: DragEndEvent): void => 
  {
    setActiveId(null);
    if(event.over && event.over.id === "droppable") 
    {
      setIsDropped(true);
    }
    else 
    {
      setIsDropped(false);
    }
  };

  const handleDragStart = (event: DragStartEvent): void => 
  {
    setActiveId(event.active.id.toString());
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <Flex
        direction="column"
        gap="20px"
        sx={{
          ".drag-overlay": {
            // display: "none",
            opacity: 0.5,
          },
        }}>
        <Droppable>{isDropped ? "Drop Here" : draggableMarkup}</Droppable>
        <Droppable>{isDropped ? draggableMarkup : "Drop Here Too"}</Droppable>
        <DragOverlay
          className="drag-overlay"
          style={{
            transform: "translate3d(0, 0, 0)",
            zIndex: 1,
          }}>
          {activeId ? <DragNDropCard {...args} label="OVERLAY"/> : null}
        </DragOverlay>
      </Flex>
    </DndContext>
  );
};

const meta: Meta = {
  argTypes: {
    dropped: {
      control: "boolean",
    },
    status: {
      control: "radio",
      options: ["default", "success", "error"],
    },
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=50-3627&mode=dev",
    },
  },
  title: "Molecules/Gamification/DragNDropCard",
};

type Story = StoryObj<typeof DragNDropCard>;

export default meta;

export const Default: Story = {
  args: {
    label: "Draggable Card",
    status: "default",
  },
};
