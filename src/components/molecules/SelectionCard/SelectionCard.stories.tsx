import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mantine/core";
import { SelectionCard } from "./SelectionCard";

const Template = (args: any) => (
  <Box w={320}>
    <SelectionCard {...args} />
  </Box>
);

const meta: Meta = {
  title: "Molecules/Gamification/SelectionCard",
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=51-9778&mode=dev",
    },
  },
  argTypes: {
    status: {
      control: "radio",
      options: ["default", "success", "error"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof SelectionCard>;

export const Default: Story = {
  args: {
    label: "Select answer",
    status: "default",
    onCheckHandler: (e) => console.log(e.target.checked),
  },
};
