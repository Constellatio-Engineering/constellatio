import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import { FloatingButton } from "./FloatingButton";

const Template: FunctionComponent = (args: any) => (
  <Box w={350}>
    <FloatingButton {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {
    disabled: {
      control: "boolean",
    },
    variation: {
      control: "radio",
      options: ["icon-big", "icon-medium", "pins", "notes-notes", "notes-no-notes"],
    },
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=48-4837&mode=design&t=fUYGnKtkoyjTfrLF-4",
    },
  },
  title: "Atoms/FloatingButton",
};

export default meta;

type Story = StoryObj<typeof FloatingButton>;

export const Default: Story = {
  args: {
    pinsNotificationsAmount: 5,
    variation: "icon-big",
  },
};
