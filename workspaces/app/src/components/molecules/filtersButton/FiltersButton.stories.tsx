import { Box } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react";
import React, { type FunctionComponent } from "react";

import type { IFiltersButton } from "./FiltersButton";
import FiltersButton from "./FiltersButton";

const Template: FunctionComponent<IFiltersButton> = (args) => (
  <Box w={350}>
    <FiltersButton {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {

  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=260-4819&mode=design&t=fmH7oiLAKqjQ5475-4",
    },
  },
  title: "Molecules/FiltersButton",
};

export default meta;

type Story = StoryObj<typeof FiltersButton>;

export const Default: Story = {
  args: {
    title: "Filters"
    
  },
};
export const Disabled: Story = {
  args: {
    disabled: true,
    title: "Filters",
  },
};
