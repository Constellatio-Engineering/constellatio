import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import StatusTableCell, { type IStatusTableCellProps } from "./StatusTableCell";

const Template: FunctionComponent<IStatusTableCellProps> = (args) => (
  <Box w={160}>
    <StatusTableCell {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {
    variant: {
      control: "select",
      options: ["notStarted", "inProgress", "completed"],
    },
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=32-1259&mode=dev",
    },
  },
  title: "Atoms/Table/StatusTableCell",
};

export default meta;

type Story = StoryObj<typeof StatusTableCell>;

export const Default: Story = {
  args: {},
};
