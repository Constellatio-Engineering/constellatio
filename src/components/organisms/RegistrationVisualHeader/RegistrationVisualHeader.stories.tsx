import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";

import { RegistrationVisualHeader } from "./RegistrationVisualHeader";

const Template = (args: any) => (
  <Box w={596}>
    <RegistrationVisualHeader {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {},
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Lq58wHThYMiImXmLJcYbGZ/Constellatio-UI-Design?type=design&node-id=273-57969&mode=dev",
    },
  },
  title: "Organisms/RegistrationVisualHeader",
};

export default meta;

type Story = StoryObj<typeof RegistrationVisualHeader>;

export const Default: Story = {
  args: {},
};
