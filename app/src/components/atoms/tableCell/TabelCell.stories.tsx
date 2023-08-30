import { Puzzle } from "@/components/Icons/Puzzle";

import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FC } from "react";

import TableCell, { type ITableCellProps } from "./TableCell";

const Template: FC<ITableCellProps> = (args) => (
  <Box w={220}>
    <TableCell {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {
    variant: {
      control: "radio",
      options: ["titleTableCell", "simpleTableCell"],
    },
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=32-951&mode=dev",
    },
  },
  title: "Atoms/TableCell",
};

export default meta;

type Story = StoryObj<typeof TableCell>;

export const WithoutIcon: Story = {
  args: {
    children: "Title table cell",
  },
};

export const WithIcon: Story = {
  args: {
    ...WithoutIcon.args,
    icon: <Puzzle/>,
  },
};
