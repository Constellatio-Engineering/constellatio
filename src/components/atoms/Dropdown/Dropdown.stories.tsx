import { Meta, StoryObj } from "@storybook/react";
import { withDesign } from "storybook-addon-designs";
import { Box } from "@mantine/core";
import { Dropdown } from "./Dropdown";
import { Puzzle } from "@/components/Icons/Puzzle";

const data = [
  { label: "Menu list item", icon: <Puzzle />, value: "1" },
  { label: "Menu list item", icon: <Puzzle />, value: "2" },
  { label: "Menu list item", icon: <Puzzle />, value: "3" },
  { label: "Menu list item", icon: <Puzzle />, value: "4" },
  { label: "Menu list item", icon: <Puzzle />, value: "5" },
  { label: "Menu list item", icon: <Puzzle />, value: "6" },
  { label: "Menu list item", icon: <Puzzle />, value: "7" },
  { label: "Menu list item", icon: <Puzzle />, value: "8" },
  { label: "Menu list item", icon: <Puzzle />, value: "9" },
  { label: "Menu list item", icon: <Puzzle />, value: "10" },
  { label: "Menu list item", icon: <Puzzle />, value: "11" },
  { label: "Menu list item", icon: <Puzzle />, value: "12" },
  { label: "Menu list item", icon: <Puzzle />, value: "13" },
];

const Template = (args: any) => (
  <Box w={350}>
    <Dropdown {...args} data={data} />
  </Box>
);

const meta: Meta = {
  title: "Atoms/Dropdown",
  component: Template,
  decorators: [withDesign],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=48-4837&mode=design&t=fUYGnKtkoyjTfrLF-4",
    },
  },
  argTypes: {
    disabled: {
      control: "boolean",
    },
    error: {
      control: "text",
      description: "Error message",
    },
    description: {
      control: "text",
      description: "Helper text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    initiallyOpened: true,
    placeholder: "Select an option",
    label: "Dropdown label",
  },
};
