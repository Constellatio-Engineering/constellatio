import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mantine/core";
import { RegistrationForm } from "./RegistrationForm";

const Template = (args: any) => (
  <Box w={400}>
    <RegistrationForm {...args} />
  </Box>
);

const meta: Meta = {
  title: "Organisms/RegistrationForm",
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Lq58wHThYMiImXmLJcYbGZ/Constellatio-UI-Design?type=design&node-id=143-26667&mode=dev",
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof RegistrationForm>;

export const Default: Story = {
  args: {},
};
