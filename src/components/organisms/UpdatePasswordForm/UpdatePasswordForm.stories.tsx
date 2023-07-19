import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mantine/core";
import { UpdatePasswordForm } from "./UpdatePasswordForm";

const Template = (args: any) => (
  <Box w={440}>
    <UpdatePasswordForm {...args} />
  </Box>
);

const meta: Meta = {
  title: "Organisms/UpdatePasswordForm",
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Lq58wHThYMiImXmLJcYbGZ/Constellatio-UI-Design?type=design&node-id=145-30737&mode=dev",
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof UpdatePasswordForm>;

export const Default: Story = {
  args: {},
};
