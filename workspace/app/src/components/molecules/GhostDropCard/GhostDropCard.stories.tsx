import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import React, { type FunctionComponent } from "react";

import { GhostDropCard } from "./GhostDropCard";

const Template: FunctionComponent = () => (
  <Box w={350}>
    <GhostDropCard/>
  </Box>
);

const meta: Meta = {
  argTypes: {
    
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=50-3732&mode=dev",
    },
  },
  title: "Molecules/Gamification/GhostDropCard",
};

export default meta;

type Story = StoryObj<typeof GhostDropCard>;

export const Default: Story = {
  args: {
   
  },
};

