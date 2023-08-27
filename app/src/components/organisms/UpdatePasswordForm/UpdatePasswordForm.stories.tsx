import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import { UpdatePasswordForm } from "./UpdatePasswordForm";

const Template: FunctionComponent = (args: any) => (
  <Box w={440}>
    <UpdatePasswordForm {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {},
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Lq58wHThYMiImXmLJcYbGZ/Constellatio-UI-Design?type=design&node-id=145-30737&mode=dev",
    },
  },
  title: "Organisms/UpdatePasswordForm",
};

export default meta;

type Story = StoryObj<typeof UpdatePasswordForm>;

export const Default: Story = {
  args: {},
};
