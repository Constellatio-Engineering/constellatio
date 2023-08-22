import { DownloadIcon } from "@/components/Icons/DownloadIcon";

import { type Meta, type StoryObj } from "@storybook/react";

import { LinkButton } from "./LinkButton";

const Template = (args: any) => <LinkButton {...args}/>;

const meta: Meta = {
  argTypes: {
    disabled: {
      control: "boolean",
    },
    size: {
      control: "radio",
      options: ["big", "medium"],
    }
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=10-205&mode=dev",
    },
  },
  title: "Atoms/LinkButton",
};

export default meta;

type Story = StoryObj<typeof LinkButton>;

export const Default: Story = {
  args: {
    icon: <DownloadIcon/>,
    size: "big",
    title: "Link button",
    
  },
};
