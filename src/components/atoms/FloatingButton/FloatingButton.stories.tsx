import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mantine/core";
import { FloatingButton } from "./FloatingButton";

const Template = (args: any) => (
  <Box w={350}>
    <FloatingButton {...args} />
  </Box>
);

const meta: Meta = {
  title: "Atoms/FloatingButton",
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=48-4837&mode=design&t=fUYGnKtkoyjTfrLF-4",
    },
  },
  argTypes: {
    variation: {
      control: "radio",
      options: ["icon-big", "icon-medium", "pins", "notes-notes", "notes-no-notes"],
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof FloatingButton>;

export const Default: Story = {
  args: {
    variation: "icon-big",
    pinsNotificationsAmount: 5,
  },
};
