import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mantine/core";
import { GhostDropCard } from "./GhostDropCard";
import React from "react";

const Template = (args: any) => (
  <Box w={350}>
    <GhostDropCard {...args} />
  </Box>
);

const meta: Meta = {
  title: "Molecules/Gamification/GhostDropCard",
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=50-3732&mode=dev",
    },
  },
  argTypes: {
    
  },
};

export default meta;

type Story = StoryObj<typeof GhostDropCard>;

export const Default: Story = {
  args: {
   
  },
};


