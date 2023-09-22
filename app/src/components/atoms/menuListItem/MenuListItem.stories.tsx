import { FileIcon } from "@/components/Icons/FileIcon";

import { type PropsOf } from "@emotion/react";
import { type Meta, type StoryObj } from "@storybook/react";
import { type FunctionComponent } from "react";

import MenuListItem from "./MenuListItem";

const Template: FunctionComponent<PropsOf<typeof MenuListItem>> = (args) => (<MenuListItem {...args}/>);

const meta: Meta = {
  argTypes: {
    
  },
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/...",
    },
  },
  title: "Organisms/MenuListItem",
};

export default meta;

type Story = StoryObj<typeof MenuListItem>;

export const Default: Story = {
  args: {
    icon: <FileIcon/>,
    title: "title"
  },
};

