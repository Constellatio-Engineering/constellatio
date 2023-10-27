import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import { LoginForm } from "./LoginForm";

const Template: FunctionComponent = () => (
  <Box w={440}>
    <LoginForm/>
  </Box>
);

const meta: Meta = {
  argTypes: {},
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Lq58wHThYMiImXmLJcYbGZ/Constellatio-UI-Design?type=design&node-id=133-25190&mode=dev",
    },
  },
  title: "organisms/LoginForm",
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  args: {},
};
