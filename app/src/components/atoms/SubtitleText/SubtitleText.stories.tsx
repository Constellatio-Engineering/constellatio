import { type ExtractProps } from "@/utils/types";

import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import { SubtitleText } from "./SubtitleText";

const Template: FunctionComponent<ExtractProps<typeof SubtitleText>> = args => (
  <Box w={350}>
    <SubtitleText {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {
    styleType: {
      control: "select",
      options: ["subtitle-01-bold", "subtitle-01-medium"]
    },
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/28lZi8gmK47C0DMkXwyUcy/Constellatio-%E2%80%93-Style-Guide?type=design&node-id=12-1911&mode=dev",
    },
  },
  title: "Atoms/SubtitleText",
};

export default meta;

type Story = StoryObj<typeof SubtitleText>;

export const Default: Story = {
  args: {
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    styleType: "subtitle-01-bold",
  },
};
