import { Box } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react";
import React, { type FunctionComponent } from "react";

import FilterTag from "./FilterTag";
import type { IFilterTag } from "./FilterTag";

const Template: FunctionComponent<IFilterTag> = (args) => (
  <Box w={350}>
    <FilterTag {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {

  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=48-4837&mode=design&t=fUYGnKtkoyjTfrLF-4",
    },
  },
  title: "Molecules/FilterTag",
};

export default meta;

type Story = StoryObj<typeof FilterTag>;

export const Default: Story = {
  args: {
    simple: false,
    title: "Story Filter Tag"
  },
};

export const Simple: Story = {
  args: {
    simple: true,
    title: "Story Filter Tag"   
  },
};
