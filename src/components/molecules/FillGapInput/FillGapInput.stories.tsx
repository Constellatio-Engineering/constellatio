import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mantine/core";
import { FillGapInput } from "./FillGapInput";

const Template = (args: any) => (
  <Box w={300}>
    <FillGapInput {...args} />
  </Box>
);

const meta: Meta = {
  title: "Molecules/Gamification/FillGapInput",
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=52-5823&mode=dev",
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

type Story = StoryObj<typeof FillGapInput>;

export const Default: Story = {
  args: {
    placeholder: "fill in the gap",
    index: 1,
  },
};
