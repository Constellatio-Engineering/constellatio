import { type ExtractProps } from "@/utils/types";

import { Box } from "@mantine/core";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import { CustomLink } from "./CustomLink";

const Template: FunctionComponent<ExtractProps<typeof CustomLink>> = args => (
  <Box w={350}>
    <CustomLink {...args}/>
  </Box>
);

const meta: Meta = {
  argTypes: {
    disabled: {
      control: "boolean",
    },
    styleType: {
      control: "select",
      options: ["link-primary", "link-secondary", "link-primary-ts", "link-content", "link-content-title"],
    },
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/28lZi8gmK47C0DMkXwyUcy/Constellatio-%E2%80%93-Style-Guide?type=design&node-id=113-1640&mode=dev",
    },
  },
  title: "Atoms/CustomLink",
};

export default meta;

type Story = StoryObj<typeof CustomLink>;

export const DefaultLink: Story = {
  args: { children: "Forgot Password?", href: "#" },
};

export const AsButton: Story = {
  args: { children: "Forgot Password?", onClick: () => alert("Clicked!") },
};
