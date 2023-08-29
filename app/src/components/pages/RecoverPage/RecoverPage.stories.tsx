import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import RecoverPage from "./RecoverPage";

const Template: FunctionComponent = () => (
  <Box w={350}>
    <RecoverPage/>
  </Box>
);

const meta: Meta = {
  argTypes: {},
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Lq58wHThYMiImXmLJcYbGZ/Constellatio-UI-Design?type=design&node-id=145-30733&mode=dev",
    },
  },
  title: "Pages/RecoverPage",
};

export default meta;

type Story = StoryObj<typeof RecoverPage>;

export const Default: Story = {
  args: {},
};
