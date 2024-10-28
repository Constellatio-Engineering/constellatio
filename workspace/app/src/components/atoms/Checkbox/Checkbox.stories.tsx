import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import { Checkbox, type CheckboxProps } from "./Checkbox";

const Template: FunctionComponent<CheckboxProps> = (args) => (
  <Box w={350}>
    <Checkbox {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {
    checked: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    error: {
      control: "text",
      description: "Error message",
    },
    indeterminate: {
      control: "boolean",
    }
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=48-4837&mode=design&t=fUYGnKtkoyjTfrLF-4",
    },
  },
  title: "Atoms/Checkbox",
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Checkbox label",
  },
};
