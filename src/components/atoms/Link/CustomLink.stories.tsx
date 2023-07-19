import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mantine/core";
import { CustomLink } from "./CustomLink";

const Template = (args: any) => (
  <Box w={350}>
    <CustomLink {...args} />
  </Box>
);

const meta: Meta = {
  title: "Atoms/CustomLink",
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/28lZi8gmK47C0DMkXwyUcy/Constellatio-%E2%80%93-Style-Guide?type=design&node-id=113-1640&mode=dev",
    },
  },
  argTypes: {
    styleType: {
      control: "select",
      options: ["primary-01", "secondary-02"],
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof CustomLink>;

export const DefaultLink: Story = {
  args: { children: "Forgot Password?", href: "#" },
};

export const AsButton: Story = {
  args: { children: "Forgot Password?", onClick: () => alert("Clicked!") },
};
