import { type PropsOf } from "@emotion/react";
import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import CategoryButton from "./CategoryButton";

const Template: FunctionComponent<PropsOf<typeof CategoryButton>> = (args) => (
  <Box w={300}>
    <CategoryButton {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {},
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=776-7887&mode=dev",
    },
  },
  title: "Molecules/CategoryButton",
};

export default meta;

type Story = StoryObj<typeof CategoryButton>;

export const Default: Story = {
  args: {
    children: "Category / Subcategory",
  },
};

export const VeryLongText: Story = {
  args: {
    children: "dictionary / criminal law / very long category name",
  },
};
