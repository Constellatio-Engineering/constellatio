import { Notepad } from "@/components/Icons/Notepad";

import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import TableLinkButton, { type ITableLinkButtonProps } from "./TableLinkButton";

const Template: FunctionComponent<ITableLinkButtonProps> = (args) => (
  <Box w={152}>
    <TableLinkButton {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {
    isLoading: {
      control: "boolean"
    }
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=557-13134&mode=dev",
    },
  },
  title: "Molecules/Table/TableLinkButton",
};

export default meta;

type Story = StoryObj<typeof TableLinkButton>;

export const Default: Story = {
  args: {
    icon: <Notepad/>,
    onClickHandler: (e) => 
    {
      console.log("clicked", e);
    },
    title: "Edit",
  },
};
