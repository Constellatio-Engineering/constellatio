import { Puzzle } from "@/components/Icons/Puzzle";

import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";

import { Dropdown } from "./Dropdown";

const data = [
  { icon: <Puzzle/>, label: "Menu list item", value: "1" },
  { icon: <Puzzle/>, label: "Menu list item", value: "2" },
  { icon: <Puzzle/>, label: "Menu list item", value: "3" },
  { icon: <Puzzle/>, label: "Menu list item", value: "4" },
  { icon: <Puzzle/>, label: "Menu list item", value: "5" },
  { icon: <Puzzle/>, label: "Menu list item", value: "6" },
  { icon: <Puzzle/>, label: "Menu list item", value: "7" },
  { icon: <Puzzle/>, label: "Menu list item", value: "8" },
  { icon: <Puzzle/>, label: "Menu list item", value: "9" },
  { icon: <Puzzle/>, label: "Menu list item", value: "10" },
  { icon: <Puzzle/>, label: "Menu list item", value: "11" },
  { icon: <Puzzle/>, label: "Menu list item", value: "12" },
  { icon: <Puzzle/>, label: "Menu list item", value: "13" },
];

const Template = (args: any) => (
  <Box w={350}>
    <Dropdown {...args} data={data}/>
  </Box>
);

const meta: Meta = {
  argTypes: {
    description: {
      control: "text",
      description: "Helper text",
    },
    disabled: {
      control: "boolean",
    },
    error: {
      control: "text",
      description: "Error message",
    },
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=48-4837&mode=design&t=fUYGnKtkoyjTfrLF-4",
    },
  },
  title: "Atoms/Dropdown",
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    initiallyOpened: true,
    label: "Dropdown label",
    placeholder: "Select an option",
  },
};
