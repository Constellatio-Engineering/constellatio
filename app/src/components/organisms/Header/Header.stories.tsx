import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import { Header, type HeaderProps } from "./Header";

const Template: FunctionComponent<HeaderProps> = args => (
  <Box maw={1440}>
    <Header {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {},
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=48-4837&mode=design&t=fUYGnKtkoyjTfrLF-4",
    },
  },
  title: "Organisms/Header",
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
};

export const Simple: Story = {
  args: {
    variant: "simple",
  },
};
