import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import type { ICountLabel } from "./CountLabel";
import CountLabel from "./CountLabel";

const Template: FunctionComponent<ICountLabel> = (args) => (
  <Box w={350}>
    <CountLabel {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["success", "error", "cases", "dictionary", "neutral"], // Automatically inferred when 'options' is defined
    },
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=193-5110&mode=dev",
    },
  },
  title: "Atoms/CountLabel",
};

export default meta;

type Story = StoryObj<typeof CountLabel>;

export const Success: Story = {
  args: {
    count: 1,
    total: 2,
    variant: "success",
  },
};
export const Error: Story = {
  args: {
    count: 1,
    total: 2,
    variant: "error",
  },
};
export const Cases: Story = {
  args: {
    count: 1,
    total: 2,
    variant: "cases",
  },
};
export const Dictionary: Story = {
  args: {
    count: 1,
    total: 2,
    variant: "dictionary",
  },
};
export const Neutral: Story = {
  args: {
    count: 1,
    total: 2,
    variant: "neutral",
  },
};
