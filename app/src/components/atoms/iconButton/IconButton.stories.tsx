import { DownloadIcon } from "@/components/Icons/DownloadIcon";

import { type Meta, type StoryObj } from "@storybook/react";

import IconButton, { type IIconButtonProps } from "./IconButton";

const Template = (args: IIconButtonProps): JSX.Element => (
  <IconButton {...args}/>
);

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
      url: "https://www.figma.com/file/KZhlH1AesOBZZf1V4F9d2r/Constellatio-%E2%80%93-UI-Kit?type=design&node-id=14-55&mode=dev",
    },
  },
  title: "Atoms/IconButton",
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: <DownloadIcon/>,
  },
};
