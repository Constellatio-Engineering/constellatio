import { Meta, StoryObj } from "@storybook/react";
import { withDesign } from "storybook-addon-designs";
import { Box } from "@mantine/core";
import { Checkbox } from "./Checkbox";

const Template = (args: any) => (
  <Box w={350}>
    <Checkbox {...args}  />
  </Box>
);

const meta: Meta = {
  title: "Atoms/Checkbox",
  component: Template,
  decorators: [withDesign],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=48-4837&mode=design&t=fUYGnKtkoyjTfrLF-4",
    },
  },
  argTypes: {
    indeterminate: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    error: {
      control: "text",
      description: "Error message",
    },
    checked: {
      control: "boolean",
    }
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Checkbox label",
  },
};
