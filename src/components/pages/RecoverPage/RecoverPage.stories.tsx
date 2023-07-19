import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mantine/core";
import { RecoverPage } from "./RecoverPage";

const Template = (args: any) => (
  <Box w={350}>
    <RecoverPage {...args} />
  </Box>
);

const meta: Meta = {
  title: "Pages/RecoverPage",
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Lq58wHThYMiImXmLJcYbGZ/Constellatio-UI-Design?type=design&node-id=145-30733&mode=dev",
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof RecoverPage>;

export const Default: Story = {
  args: {},
};
