import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import ColumnHeader, { type IColumnHeaderProps } from "./ColumnHeader";

const Template: FunctionComponent<IColumnHeaderProps> = (args) => (
  <Box w={167}><ColumnHeader {...args}/></Box>
);

const meta: Meta = {
  argTypes: {
    doesSort: {
      control: "boolean",
      defaultValue: true,
    },
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=32-4433&mode=dev",
    },
  },
  title: "Atoms/Table/ColumnHeader",
};

export default meta;

type Story = StoryObj<typeof ColumnHeader>;

export const Default: Story = {
  args: {
    title: "Column Header",
  },
};
