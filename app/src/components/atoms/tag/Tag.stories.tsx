import { Box } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react";
import React, { type FunctionComponent } from "react";

import Tag from "./Tag";
import type { ITag } from "./Tag";
const Template: FunctionComponent<ITag> = (args) => (
  <Box w={350}>
    <Tag {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {

  },
  component: Template,
  parameters: {
    
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=206-5043&mode=design&t=pgrdqHGCiqomWoc1-4",
    },
  },
  title: "Atoms/Tag",
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    title: "StoryTag"
  },
};
