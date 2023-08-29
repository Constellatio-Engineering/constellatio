import { DownloadIcon } from "@/components/Icons/DownloadIcon";

import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import TableIconButton, { type ITableIconButtonProps } from "./TableIconButton";

const Template: FunctionComponent<ITableIconButtonProps> = (args) => (
  <Box w={152}>
    <TableIconButton {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {},
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=32-4495&mode=dev",
    },
  },
  title: "Atoms/Table/TableIconButton",
};

export default meta;

type Story = StoryObj<typeof TableIconButton>;

export const Default: Story = {
  args: {
    icon: <DownloadIcon/>,
    onClickHandler: (e) => 
    {
      console.log("clicked", e);
    },
  },
};
