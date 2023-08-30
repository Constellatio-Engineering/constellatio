import { Box } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react";
import React, { type FunctionComponent } from "react";

import CategoryTab, { type CategoryTabProps } from "./CategoryTab";

const Template: FunctionComponent<CategoryTabProps> = args => (
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
    icon: {
      src: "https://assets.caisy.io/assets/21691a6c-f949-491d-99a3-079a4bd23818/66502932-ff6e-48a0-a64f-d74c7fd8ecda/4beef6a9-ca67-4b1c-a862-812ef87d7bf1civillawcategoryicon.svg"
    }
    ,
    itemsNumber: 23,
    title: "CategoryTab StoryProp",
  },
};
