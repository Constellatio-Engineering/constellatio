import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import { FillGapInput, type FillGapInputProps } from "./FillGapInput";

const Template: FunctionComponent<FillGapInputProps> = (args) => (
  <Box w={300}>
    <FillGapInput {...args}/>
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
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=52-5823&mode=dev",
    },
  },
  title: "Molecules/Gamification/FillGapInput",
};

export default meta;

type Story = StoryObj<typeof FillGapInput>;

export const Default: Story = {
  args: {
    index: 1,
    placeholder: "fill in the gap",
  },
};
