import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import StatusLabel, { type IStatusLabel } from "./StatusLabel";

const Template: FunctionComponent<IStatusLabel> = (args) => (
  <Box w={112}>
    <StatusLabel {...args}/>
  </Box>
);

const meta: Meta = {

  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=163-4598&mode=dev",
    },
  },
  title: "Atoms/StatusLabel",
};

export default meta;

type Story = StoryObj<typeof StatusLabel>;

export const NotStarted: Story = {
  args: {
    variant: "notStarted",
  },
};
export const InProgress: Story = {
  args: {
    variant: "inProgress",
  },
};
export const Completed: Story = {
  args: {
    variant: "completed",
  },
};
