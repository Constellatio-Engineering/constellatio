import { Meta, StoryObj } from "@storybook/react";
import { withDesign } from "storybook-addon-designs";
import { Box } from "@mantine/core";
import { CaptionText } from "./CaptionText";

const Template = (args: any) => (
  <Box w={350}>
    <CaptionText {...args} />
  </Box>
);

const meta: Meta = {
  title: "Atoms/CaptionText",
  component: Template,
  decorators: [withDesign],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/28lZi8gmK47C0DMkXwyUcy/Constellatio-%E2%80%93-Style-Guide?type=design&node-id=12-2128&mode=dev",
    },
  },
  argTypes: {
    styleType: {
      control: "radio",
      options: ["caption-01-bold", "caption-01-medium"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof CaptionText>;

export const Default: Story = {
  args: {
    children: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ",
    styleType: "caption-01-bold",
  },
};
