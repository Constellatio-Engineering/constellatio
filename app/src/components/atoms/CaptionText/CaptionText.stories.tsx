import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import { CaptionText } from "./CaptionText";

const Template: FunctionComponent = (args: any) => (
  <Box w={350}>
    <CaptionText {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {
    styleType: {
      control: "radio",
      options: ["caption-01-bold", "caption-01-medium"],
    },
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/28lZi8gmK47C0DMkXwyUcy/Constellatio-%E2%80%93-Style-Guide?type=design&node-id=12-2128&mode=dev",
    },
  },
  title: "Atoms/CaptionText",
};

export default meta;

type Story = StoryObj<typeof CaptionText>;

export const Default: Story = {
  args: {
    children: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ",
    styleType: "caption-01-bold",
  },
};
