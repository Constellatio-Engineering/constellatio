import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mantine/core";
import { LoginForm } from "./LoginForm";

const Template = (args: any) => (
  <Box w={440}>
    <LoginForm {...args} />
  </Box>
);

const meta: Meta = {
  title: "organisms/LoginForm",
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Lq58wHThYMiImXmLJcYbGZ/Constellatio-UI-Design?type=design&node-id=133-25190&mode=dev",
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  args: {},
};
