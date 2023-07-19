import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mantine/core";
import { BodyText } from "./BodyText";

const Template = (args: any) => (
  <Box w={350}>
    <BodyText {...args} />
  </Box>
);

const meta: Meta = {
  title: "Atoms/BodyText",
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/28lZi8gmK47C0DMkXwyUcy/Constellatio-%E2%80%93-Style-Guide?type=design&node-id=12-1966&mode=dev",
    },
  },
  argTypes: {
    styleType: {
      control: "select",
      options: ["body-01-bold", "body-01-medium", "body-01-regular", "body-02-medium"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof BodyText>;

export const Default: Story = {
  args: {
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    styleType: "body-01-bold",
  },
};
