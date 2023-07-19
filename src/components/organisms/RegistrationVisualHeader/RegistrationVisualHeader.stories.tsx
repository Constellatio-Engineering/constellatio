import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mantine/core";
import { RegistrationVisualHeader } from "./RegistrationVisualHeader";

const Template = (args: any) => (
  <Box w={596}>
    <RegistrationVisualHeader {...args} />
  </Box>
);

const meta: Meta = {
  title: "Organisms/RegistrationVisualHeader",
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Lq58wHThYMiImXmLJcYbGZ/Constellatio-UI-Design?type=design&node-id=273-57969&mode=dev",
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof RegistrationVisualHeader>;

export const Default: Story = {
  args: {},
};
