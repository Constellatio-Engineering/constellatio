import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";

import { SelectionCard } from "./SelectionCard";

const Template = (args: any) => (
  <Box w={320}>
    <SelectionCard {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {
    status: {
      control: "radio",
      options: ["default", "success", "error"],
    },
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=51-9778&mode=dev",
    },
  },
  title: "Molecules/Gamification/SelectionCard",
};

export default meta;

type Story = StoryObj<typeof SelectionCard>;

export const Default: Story = {
  args: {
    label: "Select answer",
    onCheckHandler: (e) => console.log(e.target.checked),
    status: "default",
  },
};
