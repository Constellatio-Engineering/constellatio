import { Box } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import CategoryTab from "./CategoryTab";

const Template = (args: any): any => (
  <Box w={350}>
    <CategoryTab {...args}/>
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
  title: "Molecules/CategoryTab",
};

export default meta;

type Story = StoryObj<typeof CategoryTab>;

export const Default: Story = {
  args: {
    title: "CategoryTab StoryProp",
  },
};
